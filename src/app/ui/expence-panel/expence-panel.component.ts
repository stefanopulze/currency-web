import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../model/transaction.model";
import {Tag} from "../../model/tag.model";
import {TransactionService} from "../../service/transaction.service";

declare var google;

@Component({
  selector: 'app-expence-panel',
  templateUrl: './expence-panel.component.html',
  styleUrls: ['./expence-panel.component.scss']
})
export class ExpencePanelComponent implements OnInit {

  tagsAsString: string;
  transaction: Transaction = new Transaction();
  coordinates: any = {
    latitude: 0,
    longitude: 0
  };
  show = false;
  closeOnEscapeHandler;

  _map: any = null;
  _marker: any = null;
  didSave = false;

  constructor(private service: TransactionService) {
  }

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        this.coordinates = position.coords;

        if (this._map) {
          this._map.setCenter(this.createGoogleCoords());
          this._marker.setPosition(this.createGoogleCoords());
        }
      }.bind(this));
    }
  }

  updateCoorinates(coors) {
    this.coordinates = {
      latitude: coors.latLng.lat(),
      longitude: coors.latLng.lng(),
      accuracy: this.coordinates.accuracy || 29
    };
  }

  createTransaction() {
    this.didSave = true;

    this.transaction.tags = this.tagsAsString
      .split(',')
      .map(v => v.trim().toLowerCase())
      .map(v => new Tag(v));

    if (this.coordinates) {
      this.transaction.latitude = this.coordinates.latitude;
      this.transaction.longitude = this.coordinates.longitude;
      this.transaction.accuracy = this.coordinates.accuracy;
    }

    this.service.createTransaction(this.transaction).subscribe(
      success => this.close(),
      error => {
        this.didSave = false;
        console.error(error);
      }
    );
  }

  resetTransaction() {
    this.transaction = new Transaction();
    this.tagsAsString = '';
  }

  close() {
    this.show = false;
    document.body.classList.remove('ovflw-hidden');
    document.removeEventListener('keydown', this.closeOnEscapeHandler);
  }

  open(transaction?: Transaction) {
    if (transaction) {
      this.transaction = transaction;
      this.coordinates = {
        latitude: transaction.latitude,
        longitude: transaction.longitude,
        accuracy: transaction.accuracy
      };
    } else {
      this.resetTransaction();
    }

    this.show = true;
    this.didSave = false;

    if (!this._map) {
      this.createGoogleMap();
    }

    document.body.classList.add('ovflw-hidden');
    document.addEventListener('keydown', this.closeOnEscapeHandler = this.closeOnEscape.bind(this));
  }

  private createGoogleMap() {
    this._map = new google.maps.Map(document.getElementById('map'), {
      center: this.createGoogleCoords(),
      zoom: 15
    });

    this._marker = new google.maps.Marker({
      position: this.createGoogleCoords(),
      map: this._map,
      draggable: true
    });

    this._marker.addListener('dragend', this.updateCoorinates.bind(this));
  }

  private createGoogleCoords() {
    return new google.maps.LatLng(
      this.coordinates.latitude,
      this.coordinates.longitude
    );
  }

  private closeOnEscape(e) {
    if (e.keyCode === 27) {
      e.preventDefault();
      this.close();
    }
  }

  findAddress(address) {
    console.log(`Find address for ${address}`);
  }
}
