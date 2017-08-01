var InterviewList = ({interviewees}) => (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          {interviewees.map((interviewee) =>
            <InterviewListEntry
              // Todo create interviewlistentry component
              //

            />
          )}
        </tr>
      </thead>
    </table>
  </div>
)

InterviewList.propTypes = {
  interviewees: React.PropTypes.array.isRequired
};

window.InterviewList = InterviewList;