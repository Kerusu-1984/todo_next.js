import { NavigationHeader } from "./NavigationHeader"
export default function Layout({ children }) {
    return (
      <>
        <NavigationHeader />
        <main>{children}</main>
      </>
    )
  }