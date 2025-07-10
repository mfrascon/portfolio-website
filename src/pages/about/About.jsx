// import Info from '../../components/Info';

const About = () => {
  return (
    <main className="section container">
      <section className="about">
        <h2 className="section-title">
          About <span>Me</span>
        </h2>

        <div className="about-contianer grid">
          <div className="about-info">
            <h3 className="section-subtitle">Info</h3>

            <ul className="info-list grid">
              {/* <Info /> */}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;