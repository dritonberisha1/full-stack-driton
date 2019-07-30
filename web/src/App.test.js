import React from 'react';
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import User from './components/user';
import Login from './pages/login';
import App from './App';

describe('<User />', () => {
   it('Renders inputs', () => {
       const login = TestRenderer.create(<User user={{}} likeUser={()=>{}} unlikeUser={()=> {}}/>);
       const testInstance = login.root;
       expect(testInstance.findByProps({className: "card mb-3"}).props.children.props.className).toEqual('d-inline px-5 py-3');
   })
});

