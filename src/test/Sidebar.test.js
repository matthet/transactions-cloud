import React from 'react';
import Sidebar from '../Sidebar';
import renderer from 'react-test-renderer';

test('Sidebar displays as expected', () => {
  const component = renderer.create(
    <Sidebar sideBarDetails={{heading: <div>DETAILS</div>}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});