import React, { useEffect, useRef, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Input } from "../ui/input";

interface Props {
  onPlaceSelected: (place: any) => void;
}

const GoogleAddressInput = ({ onPlaceSelected }: Props) => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_PLACES_API_KEY,
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => console.log("Place details", placeDetails)
      );
  }, [placePredictions]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getPlacePredictions({ input: inputValue });
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handleSetPrediction = (prediction: any) => {
    placesService?.getDetails(
      {
        placeId: prediction.place_id,
      },
      (placeDetails) => {
        setInputValue("");
        getPlacePredictions({ input: "" });
        onPlaceSelected(placeDetails);
      }
    );
  };

  const handleClickOutside = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void
  ) => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, []);
  };

  const wrapperRef = useRef(null);
  handleClickOutside(wrapperRef, () => {
    getPlacePredictions({ input: "" });
  });
  return (
    <div className="relative">
      <Input
        className="account-form_input form-input"
        placeholder="Search address here..."
        onChange={(evt) => {
          setInputValue(evt.target.value);
          // getPlacePredictions({ input: evt.target.value });
        }}
        value={inputValue}
        // loading={isPlacePredictionsLoading}
      />
      <div ref={wrapperRef} className="absolute bg-slate-500 overflow-y-auto">
        {placePredictions.map((item, index) => (
          <div>
            <p
              onClick={() => handleSetPrediction(item)}
              className=" text-white px-4 py-2 cursor-pointer hover:bg-slate-400"
            >
              {item.description}
            </p>
            {index !== placePredictions.length - 1 && (
              <hr className="border-white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleAddressInput;
