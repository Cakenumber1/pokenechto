import { useRouter } from 'next/router'
import { SyntheticEvent } from 'react';

type ActiveLinkType = {
  children : any
  href: string
}

export function ActiveLink({ children, href } : ActiveLinkType) {
  const router = useRouter()


  const handleClick = (e : SyntheticEvent) => {
    e.preventDefault()
    setTimeout(() => {
      router.push(href)
    }, 2000)
  }

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  )
}
