import Head from "next/head"
import Image from "next/image"
import { SSRProvider } from 'react-bootstrap';
import RegisterForm from "@/components/Auth/RegisterForm/RegisterForm"

export default function Home() {
  return (
    <SSRProvider>
      <Head>
        <title>Jobhub | Register Worker Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/jobhub.ico" />
      </Head>
      <RegisterForm />
    </SSRProvider>
  )
}
