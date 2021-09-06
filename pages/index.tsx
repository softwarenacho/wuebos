import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import path from 'path'
import moment, { Moment } from 'moment'
import Clock from '../components/Clock'


interface Lines {
  lines: Line
}
interface Line {
  time: Moment
  author: string
  text: string
  map: any
}

interface Chats {
  texts: Array<string>;
  images: Array<string>;
  videos: Array<string>;
}

export default function Home({lines}: Lines) {
  const authors = lines.map((line: Line) => line.author)

  return (
    <div className={styles.container}>
      <Head>
        <title>Wuebos</title>
        <meta name="description" content="Whatsapp ünited email backup opener system" />
        <link rel="icon" href="/wüebos.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Clock />
          <span>Welcome to <a href="wüebos">Wüebos</a></span>
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
              <div className={styles.logo} >
                <Image alt="wüebos"src="/wüebos.png" height="50rem" width="50rem"/>
              </div>
            </div>
        </div>
        <div className={styles.grid}>
          <h2>Conversation:</h2>
          {lines.map((line: Line, index: number) => (
            <div 
              key={`line-${index}`}
              className={`
                ${styles.card} 
                ${line.author === authors[0] ? styles.left : styles.right} 
                ${line.author !== lines[index -1]?.author ? styles.first : styles.notFirst}
              `}>
              <span className={styles.text}>
                {line.text}
              </span>
              <span className={styles.author}>
                {line.author}
              </span>
              <span className={styles.time}>
                {line.time}
              </span>
            </div>
          ))}
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
  try {
    const postsDirectory = path.join(process.cwd(), 'example')
    const filenames = fs.readdirSync(postsDirectory)
    
    const files: Chats = {
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
  
    const rawRows = fs.readFileSync(`example/${files.texts[0]}`).toString().split("\n")
  
    const lines = rawRows.map(line => {
      const splitLine = line.split("-")
      if (splitLine.length === 1) {
        return {
          "text": splitLine[0],
        }
      } else {
        const time = moment(splitLine[0].trim(), 'M/D/YY, H:mm a').format('YYYY-MM-DD - HH:mm')
        splitLine.shift()
        const content = [...splitLine.map(l => l.trim())].join(" ").split(":")
        const author = content[0]
        content.shift()
        const text = [...content].join(" ").trim()
        return {
          time: time,
          author: author,
          text: text,
        }
      }
    })
    .filter(line => line.text !== "")
    
    return {
      props: {
        lines,
      },
    }
  } catch (error) {
    return {
      props: {
        lines: [],
      }
    }
  }
}