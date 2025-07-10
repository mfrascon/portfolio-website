import { useState } from 'react';
import { portfolio } from '../../Data';
import { RiLinkM } from "react-icons/ri";
import './portfolio.css';

const Portfolio = () => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleDescription = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className='portfolio section'>
      <h2 className='section-title'>
        My <span>Portfolio</span>
      </h2>

      <div className='portfolio-container container grid'>
        {portfolio.map(({ id, img, title, description, skills, link }) => {
          const isExpanded = expandedCards[id];

          return (
            <article className='portfolio-card' key={id}>
              <a href={link} className='portfolio-img-wrapper'>
                <img src={img} alt='' className='portfolio-img' />
              </a>

              <h3 className='portfolio-title'>{title}</h3>
              <p className='portfolio-description'>
                {isExpanded ? (
                  <>
                    {description}
                    <span 
                      onClick={() => toggleDescription(id)} 
                      className='show-more-link'
                    >
                      &nbsp;Show less
                    </span>
                  </>
                ) : (
                  <>
                    {description.slice(0, 100)}...
                    <span 
                      onClick={() => toggleDescription(id)} 
                      className='show-more-link'
                    >
                      Show more
                    </span>
                  </>
                )}
              </p>

              <div className='portfolio-skills'>
                {skills.map((skill, index) => (
                  <img src={skill} className='portfolio-skill' key={index} />
                ))}
              </div>

              <a href={link} className='portfolio-link'>
                <RiLinkM className='link-icon'/>
                Visit Project
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
