export const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $phone: String!
    $role: String!
    $educationalLevel: String
    $faculty: String
    $expertise: String
    $qualification: String
    $experience: Int
    $password: String!
  ) {
    register(
      name: $name
      email: $email
      phone: $phone
      role: $role
      educationalLevel: $educationalLevel
      faculty: $faculty
      expertise: $expertise
      qualification: $qualification
      experience: $experience
      password: $password
    ) {
      success
      message
    }
      user{
        id
        name
        email
        phone
        role
        expertStatus
        expertise
        qualification
        experience
      }
  }
`;