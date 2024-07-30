import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  fetchSingleVendor,
  getSingleVendor,
  selectVendorById,
} from "../../store/vendorsSlice";
import logo1 from "../../assets/images/logo1.png";
import ChatIcon from "@mui/icons-material/Chat";

function VendorChatInfo({ conversation, vendorId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vendordata = useSelector(getSingleVendor);
  const vendor = useSelector((state) => selectVendorById(state, vendorId));
  // const vendor = vendordata && vendordata.result;

  useEffect(() => {
    if (vendorId) {
      dispatch(fetchSingleVendor(vendorId));
    }
    console.log(vendor);
  }, [dispatch, vendorId]);

  return (
    <div className="d-flex align-items-center">
      {vendor && vendor.logo ? (
        <img
          src={vendor && vendor.logo}
          alt="User Avatar"
          className="avatar ms-3"
        />
      ) : (
        <img src={logo1} alt="User Avatar" className="avatar ms-3" />
      )}
      <div className="d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="conversation-name">
            {vendor && vendor.brandName}
          </span>
          <ChatIcon className="ms-1" />
        </div>
      </div>
    </div>
  );
}

export default VendorChatInfo;
