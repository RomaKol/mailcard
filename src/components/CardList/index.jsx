import React, {Component, Fragment} from 'react';
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
    this.handleRemoveSelection();
  };

  handleRemoveSelection = () => {
    this.setState({
      array: [],
    });
  };

  handleCheckAll = () => {
    const {cardsArray} = this.props;
    this.setState({
      array: [...cardsArray],
    });
  };

  handleToggleAll = () => {
    const {array} = this.state;
    const {cardsArray} = this.props;
    if (array.length === cardsArray.length) {
      this.handleRemoveSelection();
    } else {
      this.handleCheckAll();
    }
  };

  render() {
    const {array} = this.state;
    const {cardsArray, deleteItems} = this.props;
    const isCheckedAll = array.length === cardsArray.length;
    // console.log("array", array);

    return (
      <Fragment>
        <div className="row justify-content-between">
          <div className="col-12 col-md-auto mb-30">
            {
              array.length > 0
                ? <div className="d-flex">
                  <button className="check-all-btn" onClick={this.handleToggleAll}>
                    <Icon name={ICON_NAMES.check} className="check-all-btn__icon" active={isCheckedAll}/>
                  </button>

                  <div className="remove-selection">
                    <span className="remove-selection__text">{`Selected (${array.length})`}</span>
                    <button
                      className="remove-selection__btn"
                      onClick={this.handleRemoveSelection}>
                      <Icon name={ICON_NAMES.close} className="remove-selection__icon"/>
                    </button>
                  </div>

                  <button
                    className="delete-all-btn"
                    onClick={this.handleDeleteChecked}>
                    <Icon name={ICON_NAMES.delete} className="delete-all-btn__icon"/>
                    <span className="delete-all-btn__text">{`Delete (${array.length})`}</span>
                  </button>
                </div>
                : <div className="section-title">Signature List</div>
            }
          </div>
          <div className="col-12 col-md-auto mb-30">
            {
              !(array.length > 0) &&
              <a className="btn">Create signature</a>
            }
          </div>
        </div>

        <div className="row">
          {
            cardsArray.length > 0 && cardsArray.map(item => {
              const isChecked = array.includes(item);
              return (
                <div
                  className="col-4"
                  key={item}>
                  <Card
                    onSelect={this.addToArray}
                    onUnSelect={this.removeFromArray}
                    onDelete={this.handleDelete}
                    id={item}
                    isChecked={isChecked}
                    modeActive={array.length > 0}/>
                </div>
              );
            })
          }
        </div>
      </Fragment>
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