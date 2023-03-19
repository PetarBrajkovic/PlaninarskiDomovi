import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, OnDestroy, Output } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature, Overlay } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input()
  mapForEdit = false;

  map: Map;
  @Output() coordinatesSelected = new EventEmitter<number[]>();

  _coordinates: number[];
  pinLayer;

  @Input()
  public get coordinates(): number[] {
    return this._coordinates;
  }

  public set coordinates(val: number[]) {
    this._coordinates = val;
    if (val && val.length > 0 && this.map) {
      const coordForMap = fromLonLat(this.coordinates);
      this.pinLayer = this.drawPin(coordForMap);
      this.map.addLayer(this.pinLayer);
      this.map.getView().setCenter(coordForMap);
      this.map.render();
    }
  }

  center;

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap())
    }
    if (this.mapForEdit) {
      this.prepareForEdit();
    }
  }

  ngOnDestroy(): void {
    this.map.setTarget(null);
    this.map = null;
  }

  initMap() {
    const rasterLayer = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    });

    this.map = new Map({
      target: 'map',
      layers: [rasterLayer],
      view: new View({
        center: fromLonLat([21.9033, 43.3247]),
        zoom: 7
      })
    });

    setTimeout(() => {
      this.map.updateSize();
    }, 300);
  }

  prepareForEdit() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.map.on('click', function (evt) {
      if (that.pinLayer) {
        evt.map.removeLayer(that.pinLayer);
      }
      const pos = toLonLat([evt.coordinate[0], evt.coordinate[1]]);
      that.coordinatesSelected.emit(Array.from(pos));
      const marker_el = document.getElementById('marker');
      marker_el.hidden = false;
      const marker = new Overlay({
        position: evt.coordinate,
        positioning: 'center-center',
        element: marker_el,
        stopEvent: false,
      });
      evt.map.addOverlay(marker);
    });
  }

  drawPin(coordinates) {
    const iconFeature = new Feature({
      geometry: new Point(coordinates),
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

    return vectorLayer;
  }

}
