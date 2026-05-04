/* global React */
window.PostRow = function PostRow({ post, go }) {
  const p = window.PILLARS[post.pillar];
  const isNote = post.kind === 'note';
  const onClick = () => { if (!isNote) go('post:' + post.id); };
  return (
    <article className={'post-row' + (isNote ? ' note' : '')} onClick={onClick}>
      <div className="post-meta">
        <span className="badge" style={{ background: isNote ? p.wash : '#F0EDE7', color: isNote ? p.deep : '#6B6B6B' }}>
          {isNote ? 'บันทึก' : 'บทความ'}
        </span>
        <span style={{ width:6, height:6, borderRadius:'50%', background: p.ink, display:'inline-block' }}></span>
        <span>{p.name}</span>
        <span>·</span>
        <span>{post.date}</span>
        {post.read && (<><span>·</span><span>อ่าน {post.read} นาที</span></>)}
      </div>
      {!isNote && <h3 className="post-title">{post.title}</h3>}
      <p className="post-excerpt">{isNote ? post.body[0] : post.excerpt}</p>
      {!isNote && <span className="post-more">อ่านต่อ</span>}
    </article>
  );
};
