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
          Hi, I'm a Full-Stack Web Developer passionate about building modern, user-friendly websites. After completing an intensive full-stack web development bootcamp, I have been applying what I learned by creating personal projects that showcase my skills across both front-end and back-end technologies. Each project is an opportunity to grow, experiment, and build something awesome!
        </p>

        <Link to='/about' className='button'>
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