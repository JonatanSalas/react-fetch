import 'jsdom-global/register';
import React from 'react';

import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { withFetch } from '../src/index';

const options = {
    url: '',
    config: {

    },
    delay: 3000,
    polling: false,
    renderOnServer: false
};

const Component = ({ jsonData }) => <div>{JSON.stringify(jsonData, null, 2)}</div>
const WrappedComponent = withFetch(options)(Component);
const getRenderedComponent = (component = WrappedComponent) => shallow(React.createElement(component));
const getMountedComponent = (component = WrappedComponent) => mount(React.createElement(component));

describe('Testing -> <FetchComponent/>', () => {
    it('instance of <FetchComponent/> is not undefined', () => {
        expect(getRenderedComponent()).to.not.equal('undefined');
    });

    it('instance of <Component/> wrapped in <FetchComponent/> is not undefined', () => {
        expect(getRenderedComponent().find(Component)).to.not.equal('undefined');
    });

    it('instance of <FetchComponent/> is not null', () => {
        expect(getRenderedComponent()).to.not.equal('null');
    });

    it('instance of <Component/> wrapped in <FetchComponent/> is not null', () => {
        expect(getRenderedComponent().find(Component)).to.not.equal('null');
    });

    it('fetchData from <FetchComponent/> is not undefined', () => {
        expect(getRenderedComponent().find('fetchData')).to.not.equal('undefined');
    });

    it('fetchInterval from <FetchComponent/> is not undefined', () => {
        expect(getRenderedComponent().find('fetchInterval')).to.not.equal('undefined');
    });

    it('fetchTimeout from <FetchComponent/> is not undefined', () => {
        expect(getRenderedComponent().find('fetchTimeout')).to.not.equal('undefined');
    });

    it('loading in <FetchComponent/> is a boolean value', () => {
        expect(getRenderedComponent().state().loading).to.be.a('boolean');
    });

    it('loading in <FetchComponent/> is true', () => {
        expect(getRenderedComponent().state().loading).to.equal(true);
    });

    it('data in <FetchComponent/> is a null value', () => {
        expect(getRenderedComponent().state().data).to.be.a('null');
    });

    it('data in <FetchComponent/> is null', () => {
        expect(getRenderedComponent().state().data).to.equal(null);
    });

    it('error in <FetchComponent/> is a null value', () => {
        expect(getRenderedComponent().state().error).to.be.a('null');
    });

    it('error in <FetchComponent/> is null', () => {
        expect(getRenderedComponent().state().error).to.equal(null);
    });

    it('it calls componentWillMount <FetchComponent/>', () => {
        const WrappedComponent = withFetch(options)(Component);
        const wrapper = getMountedComponent();

        expect(WrappedComponent.prototype.componentDidMount).to.be.a('function');
    });

    it('it calls componentDidMount <FetchComponent/>', () => {
        const WrappedComponent = withFetch({...options, polling: true })(Component);
        const wrapper = getMountedComponent(withFetch({...options, polling: true })(Component));

        expect(WrappedComponent.prototype.componentDidMount).to.be.a('function');
    });

    it('it calls componentWillUnmount <FetchComponent/>', () => {
        const WrappedComponent = withFetch({...options, polling: true })(Component);
        const wrapper = getMountedComponent(withFetch({...options, polling: true })(Component));

        expect(WrappedComponent.prototype.componentWillUnmount).to.be.a('function');
    });

    it('set data and loading in false in <FetchComponent/>', () => {
        const wrapper = getRenderedComponent();
        wrapper.setState({ data: { result: "awesome result" }, loading: false });
    });

    it('set error and loading in false in <FetchComponent/>', () => {
        const wrapper = getRenderedComponent();
        wrapper.setState({ error: "some error", loading: false });
    });

    it('if no url is passed it throws an error', () => {
        try {
            withFetch({})(Component);
        } catch (err) {
            expect(err.message).to.equal('URL is undefined. You should define url key in your options object.');
        }
    });

    it('if no config is passed it throws an error', () => {
        try {
            withFetch({ url: '', config: null })(Component);
        } catch (err) {
            expect(err.message).to.equal('Config is undefined or empty. You should define config key in your options object.');
        }
    });
})
