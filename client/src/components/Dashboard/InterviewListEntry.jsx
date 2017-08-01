var InterviewListEntry = ({interviewee, handleActionClick}) => (
  <tbody>
    <tr>
      <td>{interviewee.date}</td>
      <td>{interviewee.time}</td>
      <td>{interviewee.name}</td>
      <td>{interviewee.email}</td>
      <td>{interviewee.interviewer}</td>
      <td>
        <div className="btn-group">
          <button className="btn btn-default btn-sm" type="button" aria-haspopup="true" aria-expanded="false" onClick={()=> handleActionClick()}>
            Add
          </button>
        </div>
      </td>
    </tr>
  </tbody>
)

InterviewListEntry.propTypes = {
  interviewee: React.PropTypes.object.isRequired
};


window.InterviewListEntry = InterviewListEntry;








// var VideoListEntry = ({video, handleVideoListEntryTitleClick}) => (
//   <div className="video-list-entry">
//     <div className="media-left media-middle">
//       <img className="media-object" src={video.snippet.thumbnails.default.url} alt="" />
//     </div>
//     <div className="media-body">
//       <div
//         className="video-list-entry-title"
//         onClick={() => handleVideoListEntryTitleClick(video)}
//       >
//         {video.snippet.title}
//       </div>
//       <div className="video-list-entry-detail">{video.snippet.description}</div>
//     </div>
//   </div>
// );

// // PropTypes tell other developers what `props` a component expects
// // Warnings will be shown in the console when the defined rules are violated
// VideoListEntry.propTypes = {
//   video: React.PropTypes.object.isRequired
// };

// // In the ES6 spec, files are "modules" and do not share a top-level scope
// // `var` declarations will only exist globally where explicitly defined




