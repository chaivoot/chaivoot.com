/* global React */
window.PostDetail = function PostDetail({ id, go }) {
  const post = window.POSTS.find(p => p.id === id);
  if (!post) return <div className="page">Not found</div>;
  const p = window.PILLARS[post.pillar];
  const related = window.RELATED_BY(id);
  return (
    <div className="fade-in">
      <a className="back-link" onClick={() => go('home')}>← กลับไปหน้าบันทึก</a>
      <article className="post-detail">
        <div className="post-meta">
          <span className="badge" style={{ background: '#F0EDE7', color: '#6B6B6B' }}>บทความ</span>
          <span style={{ width:6, height:6, borderRadius:'50%', background: p.ink, display:'inline-block' }}></span>
          <span>{p.name}</span>
          <span>·</span><span>{post.date}</span>
          {post.read && (<><span>·</span><span>อ่าน {post.read} นาที</span></>)}
        </div>
        <h1>{post.title}</h1>
        <p className="post-excerpt-lg">{post.excerpt}</p>
        <div className="body">
          {post.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        {post.tags && (
          <div className="tags">
            {post.tags.map(t => <span key={t} className="tag">#{t}</span>)}
          </div>
        )}
        <window.AuthorCard />

        {related.length > 0 && (
          <>
            <div className="related-h">บันทึกที่เกี่ยวข้อง</div>
            <div className="related-list">
              {related.map(r => <window.PostRow key={r.id} post={r} go={go} />)}
            </div>
          </>
        )}
      </article>
    </div>
  );
};
