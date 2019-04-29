import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import Loading from '../loadingIcon/loading'
import {getCards, getQuiz, addCard, updateCardList} from '../../store/actions/quizActions'
import ReactNotification from "react-notifications-component";

import './quizView.scss';

class QuizViewComponent extends Component{
    constructor(props){
      super(props);
      this.quizId = this.props.match.params.quizId;
      this.state= {quizId:this.quizId, editButton_text: 'Edit', curr_card_index: 0, cardOnFront: true, cardList: this.props.cardList, newCard:{term:'', description:'', imageURL:'', similarWords:[]}};
      this.props.getQuiz(this.quizId);

      this.rotateClicked = this.rotateClicked.bind(this);
      this.addNotification = this.addNotification.bind(this);
      this.notificationDOMRef = React.createRef();
    }

    componentDidMount(){
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    }

    componentWillUnmount(){
      this.setState({});
    }

    editButtonClicked(){
      this.setState({editButton_text: this.state.editButton_text === 'Edit' ? 'Finish' : 'Edit'})
    }

    deleteButtonClicked(){
      let old_index = this.state.curr_card_index;
      let new_index = old_index === this.state.cardList.length -1 ? old_index-1 : old_index
      new_index = new_index < 0 ? 0 : new_index;
      this.setState({cardList: this.state.cardList.filter((item, index)=> index !== old_index), curr_card_index: new_index});
    }

    addButtonClicked(){
      let new_cardList = this.state.cardList;
      let term = this.state.newCard.term;
      new_cardList.push(this.state.newCard);

      this.setState({cardList: new_cardList, curr_card_index: new_cardList.length-1, newCard:{term:'', description:'', imageURL:'', similarWords:[]}}, ()=>{
        this.addNotification('Add word successfully', term+ ' is added successfully', 'success');
      });
    }

    saveButtonClicked(){
      this.setState({editButton_text: 'Edit'}, ()=>{
        this.props.updateCardList(this.state.quizId, this.state.cardList);
      })
    }

    rotateClicked(){
      this.setState({cardOnFront: !this.state.cardOnFront});
    }

    nextCard(){
      this.setState({curr_card_index: this.state.curr_card_index+1, cardOnFront: true});
    }

    prevCard(){
      this.setState({curr_card_index: this.state.curr_card_index-1, cardOnFront: true});
    }

    inputHandler(name, index, e, i){
      let cardList = this.state.cardList;
      if (i === undefined){
        cardList[index][name] = e.target.value;
      }
      else{
        cardList[index][name][i] = e.target.value;
      }
      this.setState({cardList: cardList});
    }

    addInputHandler(e, name, index){
      let newCard = this.state.newCard;
      if (index === undefined)
        newCard[name] = e.target.value;
      else
        newCard[name][index] = e.target.value;
      this.setState({newCard: newCard})
    }

    render(){
      let term_card = ()=> {
        let index = this.state.curr_card_index;
        let curr_card = this.state.cardList[index];

        return (
          <div className="card-view front-card-view">
              {this.state.editButton_text === 'Edit'? (<p className="term-text">{curr_card.term}</p>)
              : (
                <React.Fragment>
                  <input className="card-edit-input term-input" id="term" type="text" value={curr_card.term} onChange={(e)=>this.inputHandler('term', index, e)}/>
                  <label htmlFor="term">Term</label>
                </React.Fragment>
              )}
          </div>
        )
      }

      let description_card = ()=> {
        let index = this.state.curr_card_index;
        let curr_card = this.state.cardList[index];
        let similarWords_div = curr_card.similarWords ? (
          <div>
            <span className="similar-word">Similar words: </span>
            {curr_card.similarWords.map(item=>(<p className="similar-word">{item}</p>))}
          </div>
        ): '';

        let similarWords_edit_div = curr_card.similarWords ? (
          <div>
            <p className="similar-word">Similar words: </p>
            {curr_card.similarWords.map((item, i)=>(
                <input className="card-edit-input similar-input" id="similar" type="text" value={item} onChange={(e)=>this.inputHandler('similarWords', index, e, i)}/>
              )
            )}
          </div>
        ): '';

        return (
          <div className="card-view back-card-view">
            {this.state.editButton_text === 'Edit'? (
              <React.Fragment>
                <pre className="card-description-text">{curr_card.description}</pre>
                {curr_card.imageURL ? <img className="card-image" src={curr_card.imageURL}/>:''}
                {similarWords_div}
              </React.Fragment>
            ): (
              <React.Fragment>
                <textarea className="card-edit-input description-input" id="card-description" type="text" value={curr_card.description} onChange={(e)=>this.inputHandler('description', index, e)}/>
                <label htmlFor="card-description">Description</label>
                <input className="card-edit-input imageURL-input" id="image-url" type="text" value={curr_card.imageURL} onChange={(e)=>this.inputHandler('imageURL', index, e)}/>
                <label htmlFor="image-url">Image URL</label>
                {similarWords_edit_div}
              </React.Fragment>
            )}
          </div>
        )
      }

      let cardInnerClassName = `card-wrapper flip-card-inner ${this.state.cardOnFront? '': 'transform-card'}`

        return(
          <div className="quizView-wrapper">
            <ReactNotification ref={this.notificationDOMRef} />
            {this.props.loaded ?(
              <div className="quizView-container container">
                <NavLink className="menu-link" to='/myquiz'>{'< Back'}</NavLink> 
                <h4>{this.props.quiz ? this.props.quiz.name : ''}</h4>
                <p>{this.props.quiz ? this.props.quiz.description : ''}</p>
                <div className="card-edit-bar">
                  <button data-target="add-card-modal" className="btn quiz-buttons modal-trigger">Add card</button>
                  {this.state.cardList.length > 0 ? <button className="btn quiz-buttons" onClick={()=>this.deleteButtonClicked()}>Delete card</button> : ''}
                  {this.state.cardList.length > 0 ? <button className="btn quiz-buttons" onClick={()=>this.editButtonClicked()}>{this.state.editButton_text}</button> : ''}
                  <button className="btn quiz-buttons" onClick={()=>this.saveButtonClicked()}>Save</button>
                </div>
                {this.state.cardList && this.state.cardList.length > 0 ? (
                  <div className="card-container flip-card">
                      <div className="card-navigator">
                        {this.state.curr_card_index +1 >1 ? <i className="material-icons card-arrow" onClick={()=>this.prevCard()} >chevron_left</i> : ''}
                        <span className="card-navigation-text">{this.state.curr_card_index +1}/{this.state.cardList.length}</span>
                        {this.state.curr_card_index +1 < this.state.cardList.length ? <i class="material-icons card-arrow" onClick={()=>this.nextCard()}>chevron_right</i> : ''}
                      </div>
                      <i className="material-icons rotate-button" onClick={()=>this.rotateClicked()}>screen_rotation</i>
                      <div className={cardInnerClassName}>
                        <div className="flip-card-front">
                          {term_card()}
                        </div>
                        <div className="flip-card-back">
                          {description_card()}
                        </div>
                      </div>
                  </div>
                ) : ''}
              </div>) : <Loading/>}
              <div id="add-card-modal" className="modal">
                  <div className="modal-content">
                      <h4>Add card</h4>
                      <p>Let's add your new flash card!</p>
                      <form className="white">
                          <div className="input-field">
                              <label htmlFor="term">Term</label>
                              <input type="text" id='term' value={this.state.newCard.term} onChange={(e)=>this.addInputHandler(e, 'term')} />
                          </div>
                          <div className="input-field">
                              <label htmlFor="description">Description</label>
                              <input type="text" id='description' value={this.state.newCard.description} onChange={(e)=>this.addInputHandler(e, 'description')} />
                          </div>
                          <div className="input-field">
                              <label htmlFor="imageURL">Image URL</label>
                              <input type="text" id='imageURL' value={this.state.newCard.imageURL} onChange={(e)=>this.addInputHandler(e, 'imageURL')} />
                          </div>
                          <div className="input-field">
                              <p>Similar words:</p>
                              <input type="text" id='similar1' value={this.state.newCard.similarWords[0]} onChange={(e)=>this.addInputHandler(e, 'similarWords', 0)} />
                              <input type="text" id='similar2' value={this.state.newCard.similarWords[1]} onChange={(e)=>this.addInputHandler(e, 'similarWords', 1)} />
                              <input type="text" id='similar3' value={this.state.newCard.similarWords[2]} onChange={(e)=>this.addInputHandler(e, 'similarWords', 2)} />
                              <input type="text" id='similar4' value={this.state.newCard.similarWords[3]} onChange={(e)=>this.addInputHandler(e, 'similarWords', 3)} />
                          </div>
                      </form>
                  </div>
                  <div className="modal-footer">
                      <a className="modal-close waves-effect waves-red btn-flat">Cancel</a>
                      <a className="modal-close waves-effect waves-green btn-flat" onClick={()=>this.addButtonClicked()}>Add</a>
                  </div>
              </div>
          </div>
       
       );
        
    }
    componentDidUpdate(prevProps){
      if (prevProps.cardList.length != this.props.cardList.length){
          let list = this.props.cardList.map(item=> item);
          this.setState({cardList: list});
      }
      
      if (prevProps.cardList != this.props.cardList && prevProps.cardList.length > 0 && this.props.quiz.quizId === prevProps.quiz.quizId){
        if (JSON.stringify(prevProps.cardList) !== JSON.stringify(this.props.cardList)){
          this.addNotification('Save successfully', 'You changes have been saved successfully', 'success');
        }
    }
  }
  
  addNotification(title, msg, type) {
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: msg,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    cardList: state.quiz.cards ? state.quiz.cards : [],
    quiz: state.quiz.quiz,
    loaded: !state.quiz.quiz ? false : true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: (quizId) => {
      dispatch(getCards(quizId));
    },
    getQuiz: (quizId) => {
      dispatch(getQuiz(quizId));
    },
    addCard: (quizId, new_card) => {
      dispatch(addCard(quizId, new_card));
    },
    updateCardList: (quizId, new_cardList) => {
      dispatch(updateCardList(quizId, new_cardList));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizViewComponent);