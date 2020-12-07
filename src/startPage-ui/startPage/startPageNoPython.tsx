// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

import * as React from 'react';
import '../../client/common/extensions';
import { ISettingPackage, IStartPageMapping, StartPageMessages } from '../../client/common/startPage/types';
import { Image, ImageName } from '../react-common/image';
import { getLocString } from '../react-common/locReactSide';
import { IMessageHandler, PostOffice } from '../react-common/postOffice';
import './startPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faPython, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFolder, faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faChevronDown, faFlask, faGlobe, faGraduationCap, faCog } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Alert } from '@material-ui/lab';


export interface IStartPageProps {
    skipDefault?: boolean;
    baseTheme: string;
    testMode?: boolean;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {children}
      </div>
    );
}

// Front end of the Python extension start page.
// In general it consists of its render method and methods that send and receive messages.
export class StartPage extends React.Component<IStartPageProps, any> implements IMessageHandler {
    private releaseNotes: ISettingPackage = {
        showAgainSetting: false
    };
    private postOffice: PostOffice = new PostOffice();

    constructor(props: IStartPageProps) {
        super(props);

        this.state = {
            showMenu: false,
            value: 0,
        }

        this.showFeatures = this.showFeatures.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public componentDidMount() {
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.RequestShowAgainSetting);
    }

    // tslint:disable: no-any
    public componentWillMount() {
        // Add ourselves as a handler for the post office
        this.postOffice.addHandler(this);

        // Tell the start page code we have started.
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.Started);

        // Bind some functions to the window, as we need them to be accessible with clean HTML to use translations
        (window as any).openBlankNotebook = this.openBlankNotebook.bind(this);
        (window as any).createPythonFile = this.createPythonFile.bind(this);
        (window as any).openFileBrowser = this.openFileBrowser.bind(this);
        (window as any).openFolder = this.openFolder.bind(this);
        (window as any).openWorkspace = this.openWorkspace.bind(this);
        (window as any).openCommandPalette = this.openCommandPalette.bind(this);
        (window as any).openCommandPaletteWithSelection = this.openCommandPaletteWithSelection.bind(this);
        (window as any).openSampleNotebook = this.openSampleNotebook.bind(this);
        (window as any).showFeatures = this.showFeatures.bind(this);
        (window as any).handleChange = this.handleChange.bind(this);
    }

    public render() {
        // tslint:disable: react-a11y-anchorr

        return (
            <div className="main-page">
                <div className="title-row">
                    <div className="title-icon" style={{"display": "inline-block"}}>
                        <Image
                            baseTheme={this.props.baseTheme}
                            class="image-button-image"
                            image={ImageName.PythonColor}
                        />
                    </div>
                    <div style={{"display": "inline-block"}}>
                        <div className="title">{getLocString('StartPage.pythonExtensionTitle', 'Welcome to the Python Extension')}</div>
                        <div>Checkout our <a>changelog</a> to see whats new!</div>
                    </div>
                </div>

                <Alert severity="warning" style={{maxWidth: 600}}>
                    <div style={{marginBottom:15}}>The Python Extension requires Python to be installed.  Install Python from <a>python.org</a> to use the Python extension.</div>
                    <a>I’ve installed Python already.</a>
                </Alert>

                <div className="row" style={{minHeight: 0}}>
                    <div className="headingText">
                        Setup your Python project
                    </div>
                </div>

                <div className="row" style={{marginBottom: 25}}>
                    <div className="checkContainer">
                        <FontAwesomeIcon className="check-icon" icon={faCheckSquare} size="4x"/>
                    </div>
                    <div className="block">
                        <div>
                            <div className="block">
                                <Tooltip title={
                                <div>
                                    <div>1. Open the command palette: ⌘ + ⇧ + P </div>
                                    <div>2. Search for “Git: Clone”</div>
                                </div>
                                } placement="right" arrow>
                                    <div className="button">
                                        <FontAwesomeIcon className="icon" icon={faGithub} size="lg"/>
                                        <div className="button-text" onClick={this.openBlankNotebook} role="button">
                                            {getLocString('StartPage.CreateJupyterNotebook', 'Clone a repository')}
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div>
                            <div className="block">
                                <Tooltip title={
                                    <div>
                                        <div>Use the shortcut: ⌘ + O</div>
                                    </div>
                                    } placement="right" arrow>
                                <div className="button">
                                    <FontAwesomeIcon className="icon" icon={faFolder} size="lg"/>
                                    <div className="button-text" onClick={this.openFileBrowser} role="button">
                                        {getLocString('StartPage.CreateJupyterNotebook', 'Open a folder/workspace')}
                                    </div>
                                </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{marginBottom: 25}}>
                    <div className="checkContainer">
                        <FontAwesomeIcon className="check-icon" icon={faCheckSquare} size="4x"/>
                    </div>
                    <div className="block">
                        <div>
                            <div className="block">
                                <Tooltip title={
                                    <div>
                                        <div>1. Open the command palette: ⌘ + ⇧ + P</div>
                                        <div>2. Search for “Python: Create new Python environment”</div>
                                    </div>
                                    } placement="right" arrow>
                                    <div className="button">
                                        <FontAwesomeIcon className="icon" icon={faPlus} size="lg"/>
                                        <div className="button-text" onClick={this.openBlankNotebook} role="button">
                                            {getLocString('StartPage.CreateJupyterNotebook', 'Create a new Python Environment')}
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div>
                            <div className="block">
                                <Tooltip title={
                                    <div>
                                        <div>1. Open the command palette: ⌘ + ⇧ + P</div>
                                        <div>2. Search for “Python: Select an existing Python interpreter”</div>
                                    </div>
                                    } placement="right" arrow>
                                    <div className="button">
                                        <FontAwesomeIcon className="icon" icon={faPython} size="lg"/>
                                        <div className="button-text" onClick={this.openBlankNotebook} role="button">
                                            {getLocString('StartPage.CreateJupyterNotebook', 'Select an existing Python interpreter')}
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="checkContainer">
                        <FontAwesomeIcon className="check-icon" icon={faSquare} size="4x"/>
                    </div>
                    <div className="block">
                        <div>
                            <div className="block">
                                <Tooltip title={
                                    <div>
                                        <div>1. Open the command palette: ⌘ + ⇧ + P</div>
                                        <div>2. Search for “Python: Create new Python file”</div>
                                    </div>
                                    } placement="right" arrow>
                                    <div className="button">
                                        <FontAwesomeIcon className="icon" icon={faPlus} size="lg"/>
                                        <div className="button-text" onClick={this.createPythonFile} role="button">
                                            {getLocString('StartPage.CreateJupyterNotebook', 'Create a new Python file')}
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div>
                            <div className="block">
                                <Tooltip title={
                                    <div>
                                        <div>1. Open the command palette: ⌘ + ⇧ + P</div>
                                        <div>2. Search for “Python: Create a new Jupyter notebook”</div>
                                    </div>
                                    } placement="right" arrow>
                                    <div className="button">
                                        <FontAwesomeIcon className="icon" icon={faPlus} size="lg"/>
                                        <div className="button-text" onClick={this.openBlankNotebook} role="button">
                                            {getLocString('StartPage.CreateJupyterNotebook', 'Create a new Jupyter notebook')}
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{minHeight: 0, marginTop: 40}}>
                    <div className="block">
                        <div className="headingText">
                            Explore the Python extension features
                        </div>
                    </div>
                    <div className="block">
                        <FontAwesomeIcon className="icon showFeatures" icon={faChevronDown} onClick={this.showFeatures} size="2x"
                        style={{paddingTop: 17, paddingBottom: 20}}/>
                    </div>
                </div>

                {this.state.showMenu &&
                <div>
                    <div className="row">
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            <Tab label={
                                <div>
                                    <div className="block">
                                    <FontAwesomeIcon className="check-icon" icon={faFlask} size="sm"/>
                                    </div>
                                    <div className="block">
                                        <div style={{marginLeft: 10, marginTop: 3, fontSize: "0.8em"}}>DATA SCIENCE</div>
                                    </div>
                                </div>
                            }/>
                            <Tab label={
                                <div>
                                    <div className="block">
                                    <FontAwesomeIcon className="check-icon" icon={faGlobe} size="sm"/>
                                    </div>
                                    <div className="block">
                                        <div style={{marginLeft: 10, marginTop: 3, fontSize: "0.8em"}}>WEB</div>
                                    </div>
                                </div>
                            }/>
                            <Tab label={
                                <div>
                                    <div className="block">
                                    <FontAwesomeIcon className="check-icon" icon={faGraduationCap} size="sm"/>
                                    </div>
                                    <div className="block">
                                        <div style={{marginLeft: 10, marginTop: 3, fontSize: "0.8em"}}>LEARN</div>
                                    </div>
                                </div>
                            }/>
                            <Tab label={
                                <div>
                                    <div className="block">
                                    <FontAwesomeIcon className="check-icon" icon={faCog} size="sm"/>
                                    </div>
                                    <div className="block">
                                        <div style={{marginLeft: 10, marginTop: 3, fontSize: "0.8em"}}>CONFIGURE</div>
                                    </div>
                                </div>
                            }/>
                        </Tabs>
                        <TabPanel value={this.state.value} index={0}>
                            <div style={{marginBottom: 10, marginTop: 10}}>
                                <a>Explore a sample Jupyter notebook</a>
                            </div>
                            <div>
                                <a>Launch the Python interactive window</a>
                            </div>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                        <div style={{marginBottom: 10, marginTop: 10}}>
                            <a>How to setup a Django workspace</a>
                        </div>
                        <div style={{marginBottom: 10, marginTop: 10}}>
                            <a>How to setup a Flask workspace</a>
                        </div>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            <div style={{marginBottom: 10, marginTop: 10}}>
                                <a>Data Science tutorial</a>
                            </div>
                            <div style={{marginBottom: 10, marginTop: 10}}>
                                <a>TBD</a>
                            </div>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={3}>
                            <div style={{marginBottom: 10, marginTop: 10}}>
                                <a>Select a Python linter</a>
                            </div>
                            <div style={{marginBottom: 10, marginTop: 10}}>
                                <a>Select a Python interpreter</a>
                            </div>
                            <div style={{marginBottom: 10, marginTop: 10}}>
                                <a>Configure a Python debugger</a>
                            </div>
                            <div style={{marginBottom: 10, marginTop: 10}}>
                                <a>Configure a Python tests</a>
                            </div>
                        </TabPanel>
                    </div>
                </div>
                }

                <div className="row" style={{minHeight: 40, marginTop: 40, marginBottom: 20}}>
                    <div style={{paddingTop: 5, paddingBottom: 5}}>
                        <div className="block">
                            <FontAwesomeIcon className="icon" icon={faTwitter} size="sm" style={{marginLeft: 0}}/>
                        </div>
                        <div className="block">
                            <p className="miniText" style={{margin: 0}}>Follow us <a>@pythonvscode</a></p>
                        </div>
                    </div>

                    <div style={{paddingTop: 5, paddingBottom: 5}}>
                        <div className="block">
                            <FontAwesomeIcon className="icon" icon={faGithub} size="sm" style={{marginLeft: 0}}/>
                        </div>
                        <div className="block">
                            <p className="miniText" style={{margin: 0}}>Report an issue</p>
                        </div>
                    </div>
                </div>

                <div className="block">
                    <input
                        type="checkbox"
                        aria-checked={!this.releaseNotes.showAgainSetting}
                        className="checkbox"
                        onClick={this.updateSettings}
                    ></input>
                </div>
                <div className="block">
                    <p>{getLocString('StartPage.dontShowAgain', "Don't show this page again")}</p>
                </div>
            </div>
        );
    }

    public handleChange = (event: any, newValue: any) => {
        this.setState({value: newValue});
    };

    public showFeatures() {
        this.setState({showMenu: !this.state.showMenu});
    };

    // tslint:disable-next-line: no-any
    public handleMessage = (msg: string, payload?: any) => {
        if (msg === StartPageMessages.SendSetting) {
            this.releaseNotes.showAgainSetting = payload.showAgainSetting;
            this.setState({});
        }

        return false;
    };

    public openFileBrowser() {
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.OpenFileBrowser);
    }

    public openFolder = () => {
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.OpenFolder);
    };

    public openWorkspace() {
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.OpenWorkspace);
    }

    private openBlankNotebook = () => {
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.OpenBlankNotebook);
    };

    private createPythonFile = () => {
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.OpenBlankPythonFile);
    };

    private openCommandPalette = () => {
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.OpenCommandPalette);
    };

    private openCommandPaletteWithSelection = () => {
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.OpenCommandPaletteWithOpenNBSelected);
    };

    private openSampleNotebook = () => {
        this.postOffice.sendMessage<IStartPageMapping>(StartPageMessages.OpenSampleNotebook);
    };

    private updateSettings = () => {
        this.releaseNotes.showAgainSetting = !this.releaseNotes.showAgainSetting;
        this.postOffice.sendMessage<IStartPageMapping>(
            StartPageMessages.UpdateSettings,
            this.releaseNotes.showAgainSetting
        );
    };
}
