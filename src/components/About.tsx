function About() {
  return (
    <div style={{
      backgroundImage: 'url(/food.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h1>This is About Page</h1>
        </div>
    </div>
  )
}

export default About
