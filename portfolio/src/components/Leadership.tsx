const Leadership = () => {
    return (
        <section id="leadership" className="section">
            <div className="container">
                <h2 className="text-lightest-navy" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span className="text-teal">03.</span> Leadership
                    <span style={{ height: '1px', background: 'var(--lightest-navy)', width: '300px', display: 'block' }}></span>
                </h2>

                <div style={{ marginTop: '50px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h3 className="text-white" style={{ fontSize: '1.5rem' }}>Chief of BGSC</h3>
                        <p className="text-teal" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '20px' }}>
                            BITS Goa Sports Council • 2023 - Present
                        </p>
                        <p className="text-slate" style={{ maxWidth: '800px' }}>
                            Leading the merged entity of FITSOC and Sports Board, managing 4-7 active leagues and fostering a vibrant campus sports culture. Responsible for organizing large-scale tournaments, managing teams, and driving student engagement.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                        {['Basketball Campus Cup', 'eSports Tournament', 'Football League', 'Cricket Championship'].map((league, index) => (
                            <div key={index} style={{
                                border: '1px solid var(--lightest-navy)',
                                padding: '20px',
                                borderRadius: '4px',
                                transition: 'transform 0.2s'
                            }}>
                                <h4 className="text-white" style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{league}</h4>
                                <p className="text-slate" style={{ fontSize: '0.9rem' }}>League Management</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Leadership;
