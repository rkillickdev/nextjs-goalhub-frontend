

const NavLinks = [
  {
      label: "Dashboard",
      authRequired: false,
      href: "/"
  },
  {
      label: "teams",
      authRequired: true,
      href: "/teams"
  }
]

export const NonUserLinks = [
  {
      label: "Signup",
      authRequired: false,
      href: "/signup"
  },
  {
      label: "Login",
      authRequired: false,
      href: "/login"
  }
]
export default NavLinks