function Message({onfetchPosts}){
  return <center className="message">
    <h2>There are no Posts</h2>
    <div className="d-grid gap-2 col-6 mx-auto">
  <button className="btn btn-primary" type="button" onClick={onfetchPosts}>Fetch Posts from server</button>
</div>
  </center>
}
export default Message;