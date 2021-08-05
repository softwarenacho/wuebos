import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import path from 'path'

export default function Home({files}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Wuebos</title>
        <meta name="description" content="Whatsapp ünited email backup opener system" />
        <link rel="icon" href="/wüebos.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="wüebos">Wüebos</a>
        </h1>
        <p className={styles.description}>
          This system will help you read your email backup of Whatsapp conversations, text and images files,
          <br />
          on a user friendly web interface
        </p>
        <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Load your zip file to create a conversation</h2>
              <p>Use the zip file as downloaded from your email conversation</p>
              <img className={styles.logo} src="wüebos.png" />
            </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="http://nacho.software/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by SoftwareNacho
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'chat')
  const filenames = fs.readdirSync(postsDirectory)


  const texts: Array<string>= filenames.filter(file => {
    const extension = file.split(".")[1]
    console.log('extension', extension)
    return extension === "txt"
  })

  const images: Array<string>= filenames.filter(file => {
    const extension = file.split(".")[1]
    console.log('extension', extension)
    return ["png", "jpg", "webp", "opus"].includes(extension)
  })


  const videos: Array<string>= filenames.filter(file => {
    const extension = file.split(".")[1]
    console.log('extension', extension)
    return ["mp4"].includes(extension)
  })

  console.log('texts', texts)
  console.log('images', images)
  console.log('videos', videos)

  const files = {
    texts: [],
    images: [],
    videos: [],
  }

  filenames.forEach(file => {
    const extension = file.split(".")[1]
    if (["txt"].includes(extension)) files.texts.push(file)
    if (["png", "jpg", "webp", "opus"].includes(extension)) files.images.push(file)
    if (["mp4"].includes(extension)) files.videos.push(file)
  });

  console.log('files', files)

  // const posts = filenames.map(filename => {
  //   const filePath = path.join(postsDirectory, filename)
  //   const fileContents = fs.readFileSync(filePath, 'utf8')

  //   // Generally you would parse/transform the contents
  //   // For example you can transform markdown to HTML here

  //   return {
  //     filename,
  //     content: fileContents,
  //   }
  // })
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      files,
    },
  }
}