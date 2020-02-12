import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from 'components/Card';
import CardsModule from 'modules/cards';
import Icon, {ICON_NAMES} from "../Icon";


class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  addToArray = (id) => {
    const {array} = this.state;
    this.setState({
      array: [...array, id],
    });
  };
  removeFromArray = (id) => {
    const {array} = this.state;
    const newArray = array.filter(item => item !== id);
    this.setState({
      array: [...newArray],
    });
  };

  handleDelete = (id) => {
    const {deleteItems} = this.props;
    deleteItems([id]);
    this.removeFromArray(id);
  };

  handleDeleteChecked = () => {
    const {deleteItems} = this.props;
    const {array} = this.state;
    deleteItems(array);
    this.setState({
      array: [],
    });
  };

  render() {
    const {array} = this.state;
    const {cardsArray, deleteItems} = this.props;
    // console.log("array", array);

    return (
      <div>
        <button
          className=""
          onClick={this.handleDeleteChecked}>
          {`delete checked (${array.length})`}
        </button>
        {
          cardsArray.length > 0 && cardsArray.map(item => {
            return (
              <Card
                key={item}
                onSelect={this.addToArray}
                onUnSelect={this.removeFromArray}
                onDelete={this.handleDelete}
                id={item}/>
            );
          })
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    cardsArray: state.cards.array,
  }),
  {
    deleteItems: (array) => CardsModule.deleteCards(array),
  }
)(CardList);