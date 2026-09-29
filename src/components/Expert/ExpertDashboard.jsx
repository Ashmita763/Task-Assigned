import { useState } from 'react'
import {
  Shell,
  Hero,
  Stats,
  Section,
  Panel,
  Table,
  Badge,
  Btn,
  Field,
} from './ui'
import { expert as seed } from './data'

const NAV = [
  { id: 'expert-overview', label: 'Overview' },
  { id: 'expert-profile', label: 'Expert profile' },
  { id: 'expert-course-builder', label: 'Course builder' },
  { id: 'expert-students', label: 'Students' },
  { id: 'expert-consultations', label: 'Consultations' },
  { id: 'expert-earnings', label: 'Earnings' },
]

const ExpertDashboard = ({ onLogout }) => {
  const [profile, setProfile] = useState({
    headline: seed.headline,
    expertise: seed.expertise,
    bio: seed.bio,
    years: seed.years,
    rate: seed.rate,
  })

  const [slot, setSlot] = useState({
    from: '',
    until: '',
  })

  const [windows, setWindows] = useState([])
  const [reqs, setReqs] = useState(seed.reschedules)
  const [available, setAvailable] = useState(false)

  const set = (k) => (e) =>
    setProfile({
      ...profile,
      [k]: e.target.value,
    })

  const done = seed.bookings.filter(
    (b) => b.status === 'Completed'
  )

  const earnings = done.reduce(
    (sum, b) => sum + b.fee,
    0
  )

  const publish = () => {
    if (
      !slot.from ||
      !slot.until ||
      slot.until <= slot.from
    ) {
      return alert('Choose a valid start and end time.')
    }

    setWindows([...windows, slot])

    setSlot({
      from: '',
      until: '',
    })
  }

  const sessions = (w) =>
    Math.floor(
      (new Date(w.until) - new Date(w.from)) /
        1800000
    )

  return (
    <Shell
      role="Expert workspace"
      nav={NAV}
      onLogout={onLogout}
    >
      {/* ================= OVERVIEW ================= */}

      <Hero
        id="expert-overview"
        eyebrow="Expert dashboard"
        name={seed.name}
        badge="Approved expert"
        sub="Manage your expertise, create PDF courses, monitor students and manage consultations."
      />

      <Stats
        items={[
          {
            label: 'Courses',
            value: seed.courses.length,
            note: 'Courses connected to your account.',
          },
          {
            label: 'Enrolled students',
            value: 0,
            note: 'Students learning from your courses.',
          },
          {
            label: 'Upcoming consultations',
            value: seed.bookings.filter(
              (b) => b.status === 'Confirmed'
            ).length,
            note: 'Pending and confirmed sessions.',
          },
          {
            label: 'Completed consultations',
            value: done.length,
            note: 'Completed expert sessions.',
          },
          {
            label: 'Consultation students',
            value: new Set(
              seed.bookings.map((b) => b.student)
            ).size,
            note: 'Unique consultation students.',
          },
          {
            label: 'Earnings',
            value: `NPR ${earnings}`,
            note: 'Completed consultation value.',
          },
        ]}
      />

      {/* ================= PROFILE ================= */}

      <Section
        id="expert-profile"
        eyebrow="Public expert information"
        title="Expert profile"
        action={
          <Btn onClick={() => setAvailable(!available)}>
            {available ? 'Available ✓' : 'Become available'}
          </Btn>
        }
      >
        <Panel className="grid gap-4 md:grid-cols-2">
          <Field
            label="Professional headline"
            value={profile.headline}
            onChange={set('headline')}
          />

          <Field
            label="Expertise"
            value={profile.expertise}
            onChange={set('expertise')}
          />

          <Field
            label="Biography"
            textarea
            className="md:col-span-2"
            value={profile.bio}
            onChange={set('bio')}
          />

          <Field
            label="Years of experience"
            type="number"
            min="0"
            value={profile.years}
            onChange={set('years')}
          />

          <Field
            label="Consultation rate in NPR"
            type="number"
            min="0"
            value={profile.rate}
            onChange={set('rate')}
          />

          <div>
            <Btn
              onClick={() =>
                alert(
                  'Profile saved (connect to updateExpertProfile mutation).'
                )
              }
            >
              Save expert profile
            </Btn>
          </div>
        </Panel>
      </Section>

      {/* ================= COURSE BUILDER ================= */}

      <Section
        id="expert-course-builder"
        eyebrow="Course content"
        title="Course builder"
        sub="Create the course first and submit it for administrator approval. After approval, manage video and PDF lessons; each new or edited lesson requires admin approval."
        action={<Btn>+ Add course</Btn>}
      >
        <Table
          cols={['Course', 'Status', 'Students']}
          empty="No courses yet."
          rows={seed.courses.map((c) => [
            c.title,
            <Badge key="s" tone="warn">
              {c.status}
            </Badge>,
            c.students,
          ])}
        />
      </Section>

      {/* ================= STUDENTS ================= */}

      <Section
        id="expert-students"
        eyebrow="Students"
        title="Courses and enrolled students"
      >
        <Panel className="text-center text-muted">
          No enrolled course students are available yet.
        </Panel>
      </Section>

      {/* ================= CONSULTATIONS ================= */}

      <Section
        id="expert-consultations"
        eyebrow="Counselling management"
        title="Consultations"
        sub="Publish your available times, review reschedule requests and manage confirmed sessions."
      >
        {/* Availability */}

        <Panel className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Your availability
          </p>

          <p className="text-muted">
            Set the full period you are available. It is
            split into 30-minute sessions; a maximum of
            three students can book you per day.
          </p>

          <div className="grid items-end gap-4 md:grid-cols-[1fr_1fr_auto]">
            <Field
              label="Available from"
              type="datetime-local"
              value={slot.from}
              onChange={(e) =>
                setSlot({
                  ...slot,
                  from: e.target.value,
                })
              }
            />

            <Field
              label="Available until"
              type="datetime-local"
              value={slot.until}
              onChange={(e) =>
                setSlot({
                  ...slot,
                  until: e.target.value,
                })
              }
            />

            <Btn onClick={publish}>
              Publish availability
            </Btn>
          </div>

          {windows.length === 0 ? (
            <p className="text-center text-muted">
              No upcoming availability. Publish a window
              so students can book.
            </p>
          ) : (
            windows.map((w, i) => (
              <p
                key={i}
                className="rounded-xl border border-line px-4 py-3 text-sm"
              >
                {w.from.replace('T', ' ')} →{' '}
                {w.until.replace('T', ' ')} ·{' '}
                <b>{sessions(w)} sessions</b>
              </p>
            ))
          )}
        </Panel>

        {/* Rescheduling */}

        <Panel className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Rescheduling
          </p>

          <h3 className="text-lg font-bold">
            Student requests
          </h3>

          {reqs.length === 0 ? (
            <p className="text-center text-muted">
              No reschedule requests are waiting.
            </p>
          ) : (
            reqs.map((r) => (
              <div
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4"
              >
                <p className="text-sm">
                  <b>{r.student}</b> wants to move{' '}
                  {r.from} → {r.to}
                </p>

                <div className="flex gap-2">
                  <Btn
                    onClick={() =>
                      setReqs(
                        reqs.filter(
                          (x) => x.id !== r.id
                        )
                      )
                    }
                  >
                    Accept
                  </Btn>

                  <Btn
                    tone="danger"
                    onClick={() =>
                      setReqs(
                        reqs.filter(
                          (x) => x.id !== r.id
                        )
                      )
                    }
                  >
                    Decline
                  </Btn>
                </div>
              </div>
            ))
          )}
        </Panel>

        {/* Bookings */}

        <Table
          cols={[
            'Student',
            'Topic',
            'Schedule',
            'Meet / recording',
            'Status',
            'Action',
          ]}
          empty="No counselling bookings are available yet."
          rows={seed.bookings.map((b) => [
            b.student,
            b.topic,
            b.when,

            b.status === 'Confirmed' ? (
              <a
                key="m"
                className="text-accent underline"
                href="#expert-consultations"
              >
                Join Meet
              </a>
            ) : (
              '—'
            ),

            <Badge
              key="s"
              tone={
                b.status === 'Completed'
                  ? 'ok'
                  : 'info'
              }
            >
              {b.status}
            </Badge>,

            b.status === 'Confirmed' ? (
              <Btn key="a" tone="ghost">
                Mark complete
              </Btn>
            ) : (
              '—'
            ),
          ])}
        />
      </Section>

      {/* ================= EARNINGS ================= */}

      <Section
        id="expert-earnings"
        eyebrow="Earnings"
        title="Earnings & history"
      >
        <Table
          cols={[
            'Student',
            'Session',
            'Date',
            'Amount (NPR)',
          ]}
          empty="No completed sessions yet."
          rows={done.map((b) => [
            b.student,
            b.topic,
            b.when,
            b.fee,
          ])}
        />
      </Section>
    </Shell>
  )
}

export default ExpertDashboard

