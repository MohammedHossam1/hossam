'use client'
import { getData } from "@/lib/fetch-methods"
import { useEffect, useState } from "react"
const ContactPage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    x()
  }, [])
  const x = async () => {
    const res = await getData({ url: "https://jsonplaceholder.typicode.com/posts" , cashed: true})
    setData(res.data)
  }

  return (
    <div>{data && data.length > 0 && data.map((item: any) => <div key={item.id}>{item.title}</div>)}</div>
  )
}

export default ContactPage