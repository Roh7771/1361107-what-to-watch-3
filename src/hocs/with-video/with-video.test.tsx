import * as React from "react";
import * as renderer from "react-test-renderer";
import withVideo from "./with-video";
import {VideoPlayerType} from "../../types";

interface Props {
  children: React.ReactNode;
}

const MockComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withVideo(MockComponent);

it(`withVideo is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isPlaying={false}
      posterSrc=""
      videoSrc=""
      type={VideoPlayerType.MOVIE}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
