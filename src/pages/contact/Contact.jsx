import {
  RiUserLine,
  RiGithubLine,
  RiLinkedinLine,
  RiMailSendLine,
  RiChatAiLine
} from 'react-icons/ri';
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
  const [isLoading, setIsLoading] = useState(false);
  const [textChanged, setTextChanged] = useState(false);
  const [openAISubmissionCount, setOpenAISubmissionCount] = useState(0);
  const MAX_OPENAI_SUBMISSIONS = 3;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setTextChanged(false); // Reset animation when user types again
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessageColor('color-red');
      setFeedbackMessage('Please fill out all fields');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    emailjs
      .send(
        'service_o08v97t',
        'template_90xfjio',
        formData,
        'aQHKCKcVeauWgK605'
      )
      .then(() => {
        setMessageColor('color-first');
        setFeedbackMessage('Message sent successfully!');
        setTimeout(() => setFeedbackMessage(''), 5000);

        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        alert('Something went wrong...', error);
      });
  };

const callOpenAI = async () => {
  if (openAISubmissionCount >= MAX_OPENAI_SUBMISSIONS) {
    setMessageColor('color-red');
    setFeedbackMessage('You have reached the rewrite limit.');
    setTimeout(() => setFeedbackMessage(''), 4000);
    return;
  }

  setIsLoading(true);

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/openai/rewrite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: formData.message })
    });

    const data = await res.json();

    if (res.ok && data.rewrittenMessage) {
      setFormData({ ...formData, message: data.rewrittenMessage });
      setOpenAISubmissionCount((prev) => prev + 1);
      setTextChanged(true);
    } else {
      console.error('Rewrite error:', data.error);
      setMessageColor('color-red');
      setFeedbackMessage('Failed to contact OpenAI API');
    }
  } catch (error) {
    console.error('Error:', error);
    setMessageColor('color-red');
    setFeedbackMessage('Server error. Please try again later.');
  } finally {
    setIsLoading(false);
  }
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
              <label className='contact-form-label'>
                Full Name <b>*</b>
              </label>
              <input
                type='text'
                name='name'
                onChange={handleChange}
                value={formData.name}
                className='contact-form-input'
              />
            </div>

            <div className='contact-form-div'>
              <label className='contact-form-label'>
                Email <b>*</b>
              </label>
              <input
                type='email'
                name='email'
                onChange={handleChange}
                value={formData.email}
                className='contact-form-input'
              />
            </div>
          </div>

          <div className='contact-form-div'>
            <label className='contact-form-label'>
              Subject <b>*</b>
            </label>
            <input
              type='text'
              name='subject'
              onChange={handleChange}
              value={formData.subject}
              className='contact-form-input'
            />
          </div>

          <div className='contact-form-div'>
            <label className='contact-form-label'>
              Message <b>*</b>
            </label>
            <textarea
              name='message'
              onChange={handleChange}
              value={formData.message}
              className={`contact-form-input contact-form-area ${
                textChanged ? 'text-changed' : ''
              }`}
            ></textarea>
          </div>

          <div className='button-group'>
            <div className='openai-button'>
              <button
                type='button'
                className='button fade-in-button'
                disabled={!formData.message.trim() || openAISubmissionCount >= MAX_OPENAI_SUBMISSIONS}
                onClick={callOpenAI}
              >
                {isLoading ? (
                  <span className='spinner'></span>
                ) : (
                  <>
                    Rewrite Using OpenAI
                    <span className='button-icon'>
                      <RiChatAiLine />
                    </span>
                  </>
                )}
              </button>
            </div>

            <div className='contact-button'>
              <button className='button'>
                Send Message
                <span className='button-icon'>
                  <RiMailSendLine />
                </span>
              </button>
            </div>
          </div>

          {feedbackMessage && (
            <p className={`contact-message ${messageColor}`}>
              {feedbackMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
