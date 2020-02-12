import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Icon, {ICON_NAMES} from 'components/Icon';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  handleSetChecked = () => {
    const {onSelect, onUnSelect, id} = this.props;
    this.setState({isChecked: !this.state.isChecked}, () => {
      if (this.state.isChecked) {
        onSelect(id);
      } else {
        onUnSelect(id);
      }
    });
  };

  handleDelete = () => {
    const {onDelete, id} = this.props;
    onDelete(id);
  };

  render() {
    const {isChecked} = this.state;
    const {onDelete} = this.props;

    return (
      <div className={isChecked ? 'card card--active' : 'card'}>
        <div className="card-view">
          <img src="./card.png" alt="" title="" className="card__img"/>
        </div>
        <div className="card-container">
          <div className="card-container__header">
            <button className="card__icon-btn card__checkbox" onClick={this.handleSetChecked}>
              <Icon name={ICON_NAMES.check} className="checkbox-icon" active={isChecked}/>
            </button>
          </div>
          <div className="card-container__body">
            <div className="card-container__text">Sent by admin: NO</div>
            <div className="card-container__text">Installed by user: NO</div>
            <div className="card-container__text">Last edited: 03.04.2019 16:43</div>
          </div>
          <div className="card-container__footer">
            <button className="card__btn">Use</button>
            <div className="card-container__footer-right">
              <button
                className="card__icon-btn card__edit">
                <Icon name={ICON_NAMES.edit} className="checkbox-icon"/>
              </button>
              <button
                className="card__icon-btn card__eye">
                <Icon name={ICON_NAMES.eye} className="checkbox-icon"/>
              </button>
              <button
                className="card__icon-btn card__delete"
                onClick={this.handleDelete}>
                <Icon name={ICON_NAMES.delete} className="checkbox-icon"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {};

export default Card;