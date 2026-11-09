import { useEffect, useState } from 'react';

export function App() {
  const [information, setInformation] = useState('Loading app information…');

  useEffect(() => {
    let active = true;
    const metadata = window.desktop?.getAppMetadata();
    if (!metadata) {
      // Keep bridge failure visible; recording capabilities remain unavailable.
      Promise.resolve().then(() => {
        if (active) setInformation('App information unavailable');
      });
    } else {
      metadata.then(
        (value) => { if (active) setInformation(`Version ${value.version}`); },
        () => { if (active) setInformation('App information unavailable'); },
      );
    }
    return () => { active = false; };
  }, []);

  return (
    <main className="shell">
      <header>
        <p className="eyebrow">Desktop workspace</p>
        <h1>Developer Work Tracker</h1>
        <p className="intro">A place for work sessions and editable descriptions.</p>
      </header>
      <section className="panel" aria-labelledby="session-heading">
        <h2 id="session-heading">Work session</h2>
        <p className="status">Tracking not implemented</p>
        <p>Session controls are unavailable in this initial shell.</p>
        <div className="controls" aria-label="Unavailable session controls">
          {['Start', 'Pause', 'Resume', 'Stop'].map((action) => (
            <button key={action} type="button" disabled aria-label={`${action} — unavailable`}>
              {action}
            </button>
          ))}
        </div>
      </section>
      <section className="panel" aria-labelledby="capabilities-heading">
        <h2 id="capabilities-heading">Workspace status</h2>
        <dl>
          <div><dt>Capture</dt><dd>Capture off</dd></div>
          <div><dt>Descriptions</dt><dd>AI not configured</dd></div>
          <div><dt>Connection</dt><dd>Local-only / not connected</dd></div>
        </dl>
        <p>No time or work context is being recorded.</p>
      </section>
      <footer><span role="status">{information}</span></footer>
    </main>
  );
}
