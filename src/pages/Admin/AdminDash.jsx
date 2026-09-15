import React from "react";
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarCheck,
  FaChartLine,
  FaClipboardCheck,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";

const stats = [
  { label: "Total Students", value: "1,248", change: "+12.5%", icon: FaUserGraduate },
  { label: "Active Experts", value: "86", change: "+8.2%", icon: FaUserTie },
  { label: "Assessments Taken", value: "3,642", change: "+18.4%", icon: FaClipboardCheck },
  { label: "Monthly Revenue", value: "NPR 482K", change: "+14.7%", icon: FaChartLine },
];

const activity = [
  { title: "New student registrations", value: "148", note: "This month", icon: FaUserGraduate },
  { title: "Completed consultations", value: "326", note: "This month", icon: FaCalendarCheck },
  { title: "Published courses", value: "42", note: "Across all categories", icon: FaBookOpen },
];

const AdminDash = () => {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">Overview</p>
            <h1 className="text-3xl font-bold text-slate-900 mt-1">Admin Dashboard</h1>
            <p className="text-slate-500 mt-2">Monitor the platform and manage daily operations.</p>
          </div>
          <p className="text-sm text-slate-500">Updated today, 09 Sep 2026</p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article key={stat.label} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-3">{stat.value}</p>
                    <p className="text-sm font-medium text-emerald-600 mt-2">{stat.change} from last month</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Icon />
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-3 mt-6">
          <article className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Platform activity</h2>
                <p className="text-sm text-slate-500 mt-1">A quick view of current platform performance.</p>
              </div>
              <span className="text-sm font-medium text-purple-600">Last 30 days</span>
            </div>

            <div className="space-y-5">
              {activity.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <Icon />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-medium text-slate-800">{item.title}</p>
                        <p className="font-bold text-slate-900">{item.value}</p>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{item.note}</p>
                      <div className="h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                        <div className="h-full w-3/4 bg-purple-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="bg-purple-700 text-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-purple-200 font-semibold uppercase tracking-wide">Quick actions</p>
            <h2 className="text-xl font-bold mt-2">Keep the platform moving</h2>
            <p className="text-sm text-purple-100 mt-2">Jump into the areas that need attention today.</p>

            <div className="space-y-3 mt-6">
              {["Review pending experts", "Manage assessments", "View payment reports"].map((action) => (
                <button key={action} type="button" className="w-full flex items-center justify-between rounded-lg bg-white/10 hover:bg-white/20 px-4 py-3 text-left transition">
                  <span className="font-medium">{action}</span>
                  <FaArrowRight className="text-sm" />
                </button>
              ))}
            </div>
          </article>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent activity</h2>
              <p className="text-sm text-slate-500 mt-1">Latest events across CodAcademy.</p>
            </div>
            <button type="button" className="text-sm font-semibold text-purple-600 hover:text-purple-700">View all</button>
          </div>

          <div className="grid gap-3 md:grid-cols-3 mt-6">
            {["12 students completed an assessment", "New expert application received", "Professional plan payment confirmed"].map((item) => (
              <div key={item} className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-700">{item}</p>
                <p className="text-xs text-slate-400 mt-2">Today</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminDash;