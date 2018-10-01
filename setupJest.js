import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// mock fetch API
global.fetch = require('jest-fetch-mock');
global.realSetTimeout = setTimeout;
