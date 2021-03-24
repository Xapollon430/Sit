import { Fragment, useEffect, useRef, useContext } from "react";
import { StoreContext } from "../../store/store";
import * as S from "./SearchSitter.styles";
import * as actions from "../../store/actions";
import L from "leaflet";
import SearchSitterHeader from "./Header/SearchSitterHeader";
import { Route } from "react-router";

const SearchSitter = () => {
  const [state, dispatch] = useContext(StoreContext);
  const mapRef = useRef(null);

  useEffect(() => {
    const mymap = L.map(mapRef.current).setView([51.505, -0.09], 13);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    ).addTo(mymap);
  }, []);

  return (
    <Fragment>
      <SearchSitterHeader />
      <S.ContentWrap>
        <S.ProfilesWrap>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
          <S.Profile>123</S.Profile>
        </S.ProfilesWrap>
        <S.LeafletMap ref={mapRef}></S.LeafletMap>
      </S.ContentWrap>
    </Fragment>
  );
};

export default SearchSitter;
