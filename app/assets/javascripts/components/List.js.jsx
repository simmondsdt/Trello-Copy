class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, list: props.list, board: props.board }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editList = this.editList.bind(this);
  }

  toggleEdit(e) {
    if(e != undefined) {
      e.preventDefault();
    }
    this.setState({ edit: !this.state.edit })
  }

  editList(e) {
    e.preventDefault();
    let listName = this.refs.listName;

    $.ajax({
      url: `/boards/${this.props.list.id}`,
      type: 'PUT',
      data: { list: { name: listName.value } },
      dataType: 'JSON',
    }).success( list => {
      this.setState({ list });
      this.toggleEdit();
    }).fail( data => {
      console.log(data);
    });
  }

  nameDisplay() {
    let list = this.state.list;

    if (this.state.edit) {
      return(
        <form ref='editList' onSubmit={this.editList}>
          <input
            type='text'
            defaultValue={list.title}
            required
            placeholder='Board List'
            ref='listName'
          />
          <input type='submit' className='btn black' />
        </form>
      );
    } else {
      return(<span className='card-title'>{ list.title }</span>);
    }
  }

  render() {
    let list = this.state.list
    return(
      <div className='col s12 m4 l3'>
        <div className='small card blue darken-1'>
          <div className='center card-content white-text'>
            { this.nameDisplay() };
          </div>
          <div className='center card-action'>
            <a href='#' className='btn grey' onClick={ this.toggleEdit }>Edit</a>
            <a href='#' className='btn grey' onClick={(e) => this.props.deleteList(e, list.id)}>Delete</a>
          </div>
        </div>
      </div>
    );
  }
}
