export default function Loading() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-box skeleton-title" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="skeleton-box skeleton-text" />
        <div className="skeleton-box skeleton-text" />
        <div className="skeleton-box skeleton-text short" />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="skeleton-box" style={{ height: '300px' }} />
        <div className="skeleton-box" style={{ height: '300px' }} />
        <div className="skeleton-box" style={{ height: '300px' }} />
      </div>
    </div>
  );
}
