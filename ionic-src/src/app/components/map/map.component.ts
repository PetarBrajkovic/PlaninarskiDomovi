import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import { Size } from 'ol/size';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit {

  map: Map;
  @Output() mapReady = new EventEmitter<Map>();

  center = fromLonLat([21.9033, 43.3247]);

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap())
    }
    setTimeout(() => this.mapReady.emit(this.map));
  }

  initMap() {
    const iconFeature = new Feature({
      geometry: new Point(this.center),
    });

    const iconStyle = new Style({
      image: new Icon({
        src: 'assets/icon/output-onlinepngtools.png',
        imgSize: [31, 50],
        anchor: [0.5, 1]
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const rasterLayer = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    });

    this.map = new Map({
      target: 'map',
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: this.center,
        zoom: 7
      })
    });

    setTimeout(() => {
      this.map.updateSize();
    }, 500);
  }

}
