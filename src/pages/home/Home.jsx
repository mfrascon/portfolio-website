import Profile from '../../assets/portrait.jpg'
import { Link } from 'react-router';
import { RiArrowRightLine } from "react-icons/ri";
import './home.css';

const Home = () => {
  return (
    <section className="home-container grid">
      <img src={Profile} alt='' className='home-img' />

      <div className='home-content'>
        <h1 className='home-title'>
          <span>Manuel Rascon</span> <br /> Full-Stack Web Developer
        </h1>

        <p className='home-description'>
          Hi, I'm passionate about building websites people can actually find and use. After years of helping others navigate complex healthcare systems, I realized I wanted to solve problems in a deeper, more scalable way — through technology. That drive led me to complete an intensive full-stack web development bootcamp. Since then, I’ve been applying what I’ve learned to real-world projects — not just building modern, user-friendly websites, but also making sure they are optimized for visibility with solid SEO. Every project is a chance to grow, experiment, and create something meaningful.
        </p>

        <Link to='/portfolio' className='button'>
          Check Out My Projects
          <span className='button-icon'>
            <RiArrowRightLine />
          </span>
        </Link>
      </div>
      <div className='color-block'>

      </div>
    </section>
  )
}

export default Home