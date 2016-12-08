class AjaxBoards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boards: [], loading: true, boardId: null };
    this.addBoard = this.addBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.setBoardId = this.setBoardId.bind(this);
  }

  // Component LifeCycle Functions
  //   componentWillMount
  //   componentDidMount
  //   componentWillRecieveProps
  //   componentWillUpdate
  //   componentDidUpdate

  componentDidMount() {
    // Materialize Component Initialization
    // $('#select').materialize-select();

    // Ajax Calls to Grab Component Data
    $.ajax({
      type: 'GET',
      url: '/boards',
      dataType: 'JSON',
    }).success( boards => {
      // Once we have data back, set state
      this.setState({ boards, loading: false });
    }).fail( data => {
      // Handle with alert or flash
      this.setState({ loading: false });
      console.log(data);
    });
  }

  setBoardId(boardId) {
    this.setState({ boardId });
  }

  deleteBoard(e, id) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${id}`,
      type: 'DELETE',
      dataType: 'JSON',
    }).success( data => {
      // Figure out how to set state and remove board
      let boards = this.state.boards;
      let index = boards.findIndex( b => b.id === id);
      this.setState({
        boards: [
          ...boards.slice(0, index),
          ...boards.slice(index + 1, boards.length)
        ]
      });
    }).fail( data => {
      console.log(data);
    });
  }

  displayBoards() {
    let boards = this.state.boards;

    if (boards.length) {
      return boards.map( board => {
        return(<Board
                  key={board.id}
                  board={board}
                  deleteBoard={this.deleteBoard}
                  setBoardId={this.setBoardId}
                />
              );
      });
    } else {
      return(<h3>No Boards! Please Add One!</h3>);
    }
  }

  addBoard(e) {
    e.preventDefault();
    // Grab the value from the input
    let boardName = this.refs.boardName.value;
    // Make the POST ajax create call
    $.ajax({
      type: 'Post',
      url: '/boards',
      dataType: 'JSON',
      data: { board: { name: boardName } }
    }).success( board => {
      this.setState({ boards: [...this.state.boards, board] });
      this.refs.addBoardForm.reset();
      this.refs.boardName.focus();
    }).fail( data => {
      console.log(data);
    });
    // Handle success and fail
    // Set state to add the new board on success
    // Reset the form
    // Auto focues the board name input
  }

  render() {
    if(this.state.loading) {
      return(<h3 className='center'>Loading Boards...</h3>);
    } else {
      return(
        <div className='row'>
          <h1>Beer Boards</h1>
          <form ref='addBoardForm' onSubmit={ this.addBoard }>
            <input ref='boardName' type='text' required placeholder='Board Name' />
            <input type='submit' className='btn black'/>
          </form>
            <br />
          { this.displayBoards() }
          <BoardModal boardId={this.state.boardId} />
        </div>
      );
    }
  }

}
