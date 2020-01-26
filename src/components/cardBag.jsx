import React, { Component } from 'react';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

const CardBag = (props) =>
{
  return (
    // card panjang ada image name qty tombol + minus sub total
    <tr>
      <td class="col-sm-8 col-md-6">
        <div class="media">
          <a class="thumbnail pull-left" href="#">
            <img
              class="media-object"
              src={props.image_path}
              style={{ width: '72px', height: '72px' }}
            />
          </a>
          <div class="media-body">
            <h4 class="media-heading" style={{ fontWeight: '600' }}>
              {props.name}
            </h4>
            <h5 class="media-heading">{props.sub_name}</h5>
          </div>
        </div>
      </td>
      <td class="col-sm-3 col-md-3">
        <div className="row">
          <input
            type="text"
            class="form-control text-center bg-white"
            id="exampleInputEmail1"
            value={props.qty_item}
            readOnly
          />
        </div>
        <div className="row d-flex justify-content-between">
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={() => props.onClick(props.id, -1)}
          >
            <span class="glyphicon glyphicon-remove"></span> -
            </button>
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={() => props.onClick(props.id, 1)}
          >
            <span class="glyphicon glyphicon-remove"></span> +
            </button>
        </div>
      </td>
      <td class="col-sm-1 col-md-1 text-center">
        <strong>{props.sell_price}</strong>
      </td>
      <td class="col-sm-1 col-md-1 text-center">
        <strong>{props.sell_price * props.qty_item}</strong>
      </td>
      <td class="col-sm-1 col-md-1">
        <button
          type="button"
          class="btn btn-dark"
          onClick={() => props.onClick(props.id, -props.qty_item)}
        >
          <span class="glyphicon glyphicon-remove"></span> #
          </button>
      </td>
    </tr>
  );
}
export default connect('username, password, isLogin, token', actions)(withRouter(CardBag));
