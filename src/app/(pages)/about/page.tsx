import { getData } from '@/lib/fetch-methods'
import React from 'react'

const AboutPage = async () => {
  const { data, code } = await getData({ url: "https://jsonplaceholder.typicode.com/posts" , cashed: true})
  console.log(data, "data")

  return (
    <div>{code == 200 && data.map((item: any) => <div key={item.id}>{item.title}</div>)}</div>
  )
}

export default AboutPage