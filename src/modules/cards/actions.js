const deleteCardsRequest = () => ({type: 'CARDS/DELETE_REQUEST'});
const deleteCardsFailure = () => ({type: 'CARDS/DELETE_FAILURE'});
const deleteCardsSuccess = (newArray) => ({type: 'CARDS/DELETE_SUCCESS', payload: {newArray}});
const deleteCards = (deletedArray) => ({type: 'CARDS/DELETE', payload: {deletedArray}});

export default {
  deleteCards, deleteCardsRequest, deleteCardsFailure, deleteCardsSuccess,
}