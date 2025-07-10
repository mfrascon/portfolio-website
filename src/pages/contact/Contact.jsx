import { RiUserLine, RiGithubLine, RiLinkedinLine, RiMailSendLine } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    subject: '',
    message: '',
  });

  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if(!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessageColor('color-red');
      setFeedbackMessage('Please fill out all fields');
      
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    emailjs
      .send(
        'service_a5owi9k', 
        'template_90xfjio', 
        formData,
        'P-9m-zJLMirt9rtH5'
      )
      .then(
        () => {
          setMessageColor('color-first');
          setFeedbackMessage('Message sent successfully!');

          setTimeout(() => setFeedbackMessage(''), 5000);

          setFormData({name: '', email: '', subject: '', message: ''})
        },
        (error) => {
          alert('Something went wrong...', error);
        },
      );
  };

  return (
    <section className='contact section'>
      <h2 className='section-title'>
        Contact <span>Me</span>
      </h2>

      <div className='contact-container container grid'>
        <div className='contact-content grid'>

          <div className='contact-card'>
            <span className='contact-icon'>
              <RiUserLine />
            </span>

            <div>
              <h3 className='contact-title'>Freelance</h3>
              <p className='contact-data'>Available Now!</p>
            </div>
          </div>

          <div className='contact-card'>
            <span className='contact-icon'>
              <HiOutlineMail />
            </span>

            <div>
              <h3 className='contact-title'>Email</h3>
              <p className='contact-data'>mfrascon.g@gmail.com</p>
            </div>
          </div>

          <div className='contact-card'>
            <span className='contact-icon'>
              <RiGithubLine />
            </span>

            <div>
              <h3 className='contact-title'>GitHub</h3>
              <p className='contact-data'>github.com/Manolo323</p>
            </div>
          </div>

          <div className='contact-card'>
            <span className='contact-icon'>
              <RiLinkedinLine />
            </span>

            <div>
              <h3 className='contact-title'>LinkedIn</h3>
              <p className='contact-data'>www.linkedin.com/in/manuel-rascon-/</p>
            </div>
          </div>

        </div>

        <form action='' className='contact-form grid' onSubmit={sendEmail}>
          <div className='contact-form-group grid'>
            <div className='contact-form-div'>
              <label htmlFor='' className='contact-form-label'>
                Full Name <b>*</b>
              </label>

              <input 
                type='text' 
                name='name' 
                onChange={handleChange} 
                value={formData.name}
                className='contact-form-input' />
            </div>

            <div className='contact-form-div'>
              <label htmlFor='' className='contact-form-label'>
                Email<b>*</b>
              </label>

              <input 
                type='email' 
                name='email' 
                onChange={handleChange} 
                value={formData.email}
                className='contact-form-input' />
            </div>
          </div>

          <div className='contact-form-div'>
              <label htmlFor='' className='contact-form-label'>
                Subject <b>*</b>
              </label>

              <input 
                type='text' 
                name='subject' 
                onChange={handleChange} 
                value={formData.subject}
                className='contact-form-input' />
            </div>

            <div className='contact-form-div'>
              <label htmlFor='' className='contact-form-label'>
                Message <b>*</b>
              </label>

              <textarea 
                name='message' 
                onChange={handleChange} 
                value={formData.message}
                className='contact-form-input contact-form-area'></textarea>
            </div>

            <div className='contact-button'>
              <button className='button'>
                Send Message
                <span className='button-icon'>
                  <RiMailSendLine />
                </span>
              </button>
            </div>

            {feedbackMessage && (
              <p className={`contact-message ${messageColor}`}>
                {feedbackMessage}
              </p>
            )}
        </form>
      </div>
    </section>
  )
}

export default Contact;