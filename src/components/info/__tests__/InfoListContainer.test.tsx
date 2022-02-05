import { Suspense } from "react";
import { render } from "@testing-library/react";
import InfoListContainer from '../InfoListContainer'
import Loader from "../../common/Loader";
import { initialState, MapStateContext } from "../../../context/MapProvider";

describe('InfoListContainer test', () => {
  it('should load Suspense', () => {
    const { container } = render(
      <Suspense fallback={<Loader />}>
        <MapStateContext.Provider value={initialState}>
          <InfoListContainer />
        </MapStateContext.Provider>
      </Suspense>
    );
    expect(container).toMatchSnapshot();
  });
});