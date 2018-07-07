import {connect} from 'dva';
import {Component} from 'react';

@connect(state => {
  return {
    chapter: state.chapter
  };
})
class Chapter extends Component {

  componentDidMount() {
    this.scrollPagination();
  }

  scrollPagination() {
    window.addEventListener('scroll', e => {
      console.log(e);
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
        document_height = document.body.offsetHeight,
        window_height = window.innerHeight;
      console.log('test', document_height - (window_height + scrollTop));
    });
  }

  render() {
    return (<div style={{height: '1000px',backgroundColor: 'red'}}></div>);
  }
}

export default Chapter;