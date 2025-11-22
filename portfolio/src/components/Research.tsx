const Research = () => {
    return (
        <section id="research" className="section">
            <div className="container">
                <h2 className="text-lightest-navy" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span className="text-teal">05.</span> Research & Publications
                    <span style={{ height: '1px', background: 'var(--lightest-navy)', width: '300px', display: 'block' }}></span>
                </h2>

                <div style={{ marginTop: '50px' }}>
                    <div style={{
                        borderLeft: '2px solid var(--teal)',
                        paddingLeft: '20px',
                        marginBottom: '30px'
                    }}>
                        <h3 className="text-white" style={{ fontSize: '1.3rem' }}>Electrocatalyst Discovery via Machine Learning</h3>
                        <p className="text-teal" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '10px' }}>
                            Co-Author • Ongoing Research
                        </p>
                        <p className="text-slate">
                            Leveraging graph neural networks to predict catalytic activity of high-entropy alloys. Bridging the gap between computational chemistry and deep learning to accelerate materials discovery for green hydrogen production.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Research;
