class BoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: {}, loading: true };
    this.modalDisplay = this.modalDisplay.bind(this);
  }

  componentWillReceiveProps(newProps) {
    $.ajax({
      url: `/boards/${newProps.boardId}`,
      type: 'GET',
      dataType: 'JSON',
    }).success( board => {
      this.setState({ board, loading: false });
    }).fail( board => {
      this.setState({ loading: false });
    });
  }

  modalDisplay() {
    let board = this.state.board;
    if(this.state.loading) {
      return(<h4>Loading Data...</h4>);
    } else {
      return(
        <h4>{ board.name }</h4>
      );
    }
  }

  render() {
    return(
      <div id="show-modal" className="modal bottom-sheet">
        <div className="modal-content">
          { this.modalDisplay() }
        </div>
        <div className="modal-footer">
          <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    );
  }

}
