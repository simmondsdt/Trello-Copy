class BoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: {}, loading: true, listId: null, lists: [] };
    this.modalDisplay = this.modalDisplay.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.setListId = this.setListId.bind(this);
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

  displayLists() {
    let board = this.state.board

    if(board.lists.length) {
      return board.lists.map( list => {
        return(<List
                  key={list.id}
                  list={list}
                  deleteList={this.deleteList}
                  setListId={this.setListId}
                />
              );
      });
    } else {
      return(<h4>No Lists! Please Add One!</h4>);
    }
  }

  setListId(listId) {
    this.setState({ listId });
  }

  addList(e) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.state.board.id}/lists`,
      type: 'POST',
      dataType: 'JSON',
      data: { list: { title: this.refs.listName.value }},
    }).success( list => {
      let board = this.state.board;
      board.lists.push(list);
      this.setState({ board });
      this.refs.addListForm.reset();
      this.refs.listName.focus();
    }).fail( list => {
      console.log(list)
    });
  }

  deleteList(e, id) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.state.board.id}/lists/${id}`,
      type: 'DELETE',
      dataType: 'JSON',
    }).success( data => {
      let lists = this.state.lists;
      let index = lists.findIndex( l => l.id === id);
      this.setState({
        list: [
          ...lists.slice(0, index),
          ...lists.slice(index + 1, lists.length)
        ]
      });
    }).fail( data => {
      console.log(data);
    });
  }

  modalDisplay() {
    // Add a new form to add a list to the board
    let board = this.state.board;
    if(this.state.loading) {
      return(<h4>Loading Data...</h4>);
    } else {
      return(
        <div>
          <h4>{ board.name }</h4>
            <form ref='addListForm' onSubmit={this.addList}>
              <input type='text' required ref='listName' placeholder='List Name' />
              <input type='submit' className='btn black' />
            </form>
            <hr />
          { this.displayLists() }
        </div>
      );
    }
  }

  render() {
    return(
      <div id="show-modal" className="modal modal-fixed-footer">
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
