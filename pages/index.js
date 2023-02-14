import { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'

export default function Home() {

  const [data, setData] = useState(null)
  const [city, setCity] = useState('')
  const [bucketList, setBucketList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const runModel = async (e) => {
    e.preventDefault()
    console.log(city)
    
    try {
      setLoading(true)

      // hit the model endpoint
      const response = await axios.post(
        `/api/model`,
        {
          city: city
        },
        {
          headers: {
            "accept": "application/json",
            "content-type": "application/json",
          },
        }
      );

      const data = response.data
      console.log(data)
      setData(data)

      let bucketList = data?.data?.message.split('\n')
      console.log(bucketList)

      let removeEmpty = bucketList.filter((item) => item !== '')
      console.log(removeEmpty)
      
      setBucketList(removeEmpty)

    } catch (error) {
      console.log(error)
      setBucketList([])
      setError(true)
    } finally {
      setLoading(false)
      setCity('')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Head>
        <title>Create A bucket list</title>
        <meta name="description" content="Create your own bucket list for a city" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col items-center justify-center gap-4 my-4'>

        <h1 className='text-5xl font-extrabold text-center'>Get your bucket list for a city, <br />state or a country</h1>
        <form className='flex flex-col justify-center items-center gap-4' onSubmit={(e) => runModel(e)}>
          {/* Get city name as input */}
          <input
            type='text'
            placeholder='Enter city name'
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
            className='border-2 border-black rounded-lg text-lg px-4 py-2'
          />
          {/* Run model on submit */}
          <button type='submit' className='border-2 border-black px-4 py-2 rounded-lg bg-white text-black text-lg'>
            Get Results
          </button>
        </form>

        {/* Display loading */}
        {loading && <Image src='https://media.tenor.com/jfmI0j5FcpAAAAAd/loading-wtf.gif' alt='loading' width={120} height={120} />}

        {/* Display error */}
        {error && <h2 className='text-2xl font-bold'>No credits remaining</h2>}

        {/* Display results */}
        <div className='flex flex-col justify-center items-center gap-4 px-8 py-4'>
          {bucketList.map((item, index) => (
            <div key={index} className='flex flex-col justify-center items-center gap-4'>
              <h2 className='text-sm font-bold'>{item}</h2>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
