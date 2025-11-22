const Footer = () => {
    return (
        <footer id="contact" style={{ padding: '50px 0', textAlign: 'center' }}>
            <div className="container">
                <h2 className="text-white" style={{ fontSize: '2rem', marginBottom: '20px' }}>Get In Touch</h2>
                <p className="text-slate" style={{ maxWidth: '500px', margin: '0 auto 50px' }}>
                    Whether you have a question, a project idea, or just want to say hi, I’ll try my best to get back to you!
                </p>
                <a href="mailto:ayush.sanger@example.com" className="btn" style={{ padding: '20px 40px', fontSize: '1.2rem' }}>
                    Say Hello
                </a>

                <div style={{ marginTop: '100px', fontSize: '0.9rem', color: 'var(--slate)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                        <a href="https://linkedin.com" className="hover:text-teal">LinkedIn</a>
                        <a href="https://github.com" className="hover:text-teal">GitHub</a>
                        <a href="https://instagram.com" className="hover:text-teal">Instagram</a>
                    </div>
                    <p>Designed & Built by Ayush Sanger</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
