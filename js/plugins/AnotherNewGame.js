//=============================================================================
// AnotherNewGame.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.4.0 2017/06/18 어나더 뉴 게임의 추가위치를 지정할 수 있는 기능 추가
// 1.3.0 2017/05/27 뉴 게임의 표시가 가능한 형태 추가
// 1.2.4 2017/05/23 플러그인 커맨드의 헬프 수정
// 1.2.3 2017/01/25 동일 서버 내에 이 플러그인을 적용한 여러 게임을 배포시 설정 중복을 피하기 위한 관리번호 추가
// 1.2.2 2016/12/10 어나더 뉴 게임 로드 시, 로드된 이벤트가 실행이 반복되는 현상을 수정
// 1.2.1 2016/11/23 원경타이틀 플러그인（ParallaxTitle.js）와 연동하는 설정 추가
// 1.2.0 2016/11/22 어나더 뉴 게임 선택 시 페이드아웃할 수 없는 설정을 추가
// 1.1.0 2016/03/29 fftfanttさん으로부터 제공받은 코드를 반영하여 어나더 뉴 게임
//                  선택 시 기존의 세이브파일을 로드하는 기능 추가
// 1.0.1 2015/11/10 플러그인 적용 중 세이브 불가현상 수정
// 1.0.0 2015/11/07 초판
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 어나더 뉴 게임 추가 플러그인
 * @author トリアコンタン
 *
 * @param name
 * @desc 타이틀 화면에 표시되는 커맨드 명칭(문자열)
 * @default Another New Game
 *
 * @param map_id
 * @desc 이동할 맵 ID（자연수）
 * @default 1
 *
 * @param map_x
 * @desc 이동할 맵의 X 좌표（자연수）
 * @default 1
 *
 * @param map_y
 * @desc 이동할 맵의 Y좌표 (자연수）
 * @default 1
 *
 * @param hidden
 * @desc 초기치로 옵션을 표시하지 않습니다. 플러그인 커멘드로 유효화시킬 수 있습니다.(ON/OFF）
 * @default OFF
 *
 * @param disable
 * @desc 기본적으로 옵션선택을 표시하지 않습니다. 플러그인 커맨드로 유효화 할 수 있습니다.(oN/OFF）
 * @default OFF
 *
 * @param file_load
 * @desc 어나더 뉴 게임을 선택할 경우 로딩화면으로 전환하고 기존 세이브 데이터를 로드합니다.（ON/OFF）
 * @default OFF
 *
 * @param no_fadeout
 * @desc 어나더 뉴 게임 선택시 오디오와 화면의 페이드아웃을 지정합니다. (ON/OFF）
 * @default OFF
 *
 * @param manage_number
 * @desc 동일서버내에 복수의 게임을 배포할 경우, 게임마다 다른 값을 설치해 주십시오.(RPG아쯔마루 제외)
 * @default
 *
 * @param add_position
 * @desc 어나더 뉴 게임 커맨드의 타이틀 메뉴 위치 지정.(1:뉴 게임 위에, 2:컨티뉴 위에, 3:옵션 위에)
 * @default 0
 *
 * @help 타이틀 화면 창 하단에 어나더 뉴 게임을 추가합니다.
 * 선택할 경우 뉴 게임과 별도로 지정된 맵으로 이동합니다.
 * 클리어 후 오마케나 CG 회상모드, 크레딧, 미니게임, 숨겨진 요소 등,
 * 사용하기에 따라 다양한 용도로 사용할 수 있습니다.
 *
 * 선택지는 미리 숨기기 또는 표시금지를 설정할 수 있습니다.
 * 적용 이후로 이 플러그인 커맨드를 통해 해제되는 숨겨진 요소들은 세이브파일을
 * 넘어서, 게임 전체에 공유됩니다. 해제된 상태를 다시 비표시(금지)할 수는 없습니다.
 *
 * 플러그인 커맨드 세부
 *   이벤트 커맨드의 '플러그인 명령'으로 사용할 경우
 *
 *  ANG_VISIBLE  # 어나더 뉴 게임을 표시함
 *  ANG_ENABLE   # 어나더 뉴 게임을 선택할 수 있음
 *  ANG_HIDDEN   # 어나더 뉴 게임을 표시하지 않음
 *  ANG_DISABLE  # 어나더 뉴 게임의 선택불가
 *  ANG_NEWGAME_HIDDEN  # 뉴 게임을 숨김
 *  ANG_NEWGAME_VISIBLE # 뉴 게임을 표시
 *
 * 사용예시（어나더 뉴 게음을 표시로 선택할 경우）
 * ANG_VISIBLE
 *
 * 뉴게임을 비표시로 할 경우, 게임을 시작하지 못할 수 있는 경우가 
 * 있사오니 주의해서 사용하여 주십시오.
 *
 * 이용규약：
 *  저작권자에 대한 무단 개조, 재배포가 가능, 이용형태(상용게임, 19금게임 이용가)
 *  에대한 제한은 없습니다.
 *  이 플러그인은 당신의 것입니다.
 */
(function() {
    var parameters      = PluginManager.parameters('AnotherNewGame');
    var localExtraStage = false;

    var getArgBoolean = function(arg) {
        return arg.toUpperCase() === 'ON';
    };

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンド[ANG_VISIBLE]などを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command.toUpperCase()) {
            case 'ANG_VISIBLE' :
                ANGSettingManager.visible = true;
                ANGSettingManager.save();
                break;
            case 'ANG_ENABLE' :
                ANGSettingManager.enable = true;
                ANGSettingManager.save();
                break;
            case 'ANG_HIDDEN' :
                ANGSettingManager.visible = false;
                ANGSettingManager.save();
                break;
            case 'ANG_DISABLE' :
                ANGSettingManager.enable = false;
                ANGSettingManager.save();
                break;
            case 'ANG_NEWGAME_HIDDEN' :
                ANGSettingManager.newGameHidden = true;
                ANGSettingManager.save();
                break;
            case 'ANG_NEWGAME_VISIBLE' :
                ANGSettingManager.newGameHidden = false;
                ANGSettingManager.save();
                break;
        }
    };

    //=============================================================================
    // Game_Map
    //  アナザーニューゲームのロード時に実行していたイベントを中断します。
    //=============================================================================
    Game_Map.prototype.abortInterpreter = function() {
        if (this.isEventRunning()) {
            this._interpreter.command115();
        }
    };

    //=============================================================================
    // Scene_Title
    //  アナザーニューゲームの選択時の処理を追加定義します。
    //=============================================================================
    var _Scene_Title_create      = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        this.loadAngSetting();
        _Scene_Title_create.call(this);
    };

    var _Scene_Title_commandContinue      = Scene_Title.prototype.commandContinue;
    Scene_Title.prototype.commandContinue = function() {
        _Scene_Title_commandContinue.call(this);
        localExtraStage = false;
    };

    Scene_Title.prototype.loadAngSetting = function() {
        ANGSettingManager.loadData();
    };

    var _Scene_Title_commandNewGameSecond      = Scene_Title.prototype.commandNewGameSecond;
    Scene_Title.prototype.commandNewGameSecond = function() {
        if (_Scene_Title_commandNewGameSecond) _Scene_Title_commandNewGameSecond.apply(this, arguments);
        if (getArgBoolean(parameters['no_fadeout'] || '')) {
            this._noFadeout = true;
        }
        if (!getArgBoolean(parameters['file_load'] || '')) {
            var preMapId           = $dataSystem.startMapId;
            var preStartX          = $dataSystem.startX;
            var preStartY          = $dataSystem.startY;
            $dataSystem.startMapId = parseInt(parameters['map_id'], 10) || 1;
            $dataSystem.startX     = parseInt(parameters['map_x'], 10) || 1;
            $dataSystem.startY     = parseInt(parameters['map_y'], 10) || 1;
            this.commandNewGame();
            $dataSystem.startMapId = preMapId;
            $dataSystem.startX     = preStartX;
            $dataSystem.startY     = preStartY;
        } else {
            this.commandContinue();
            localExtraStage = true;
        }
    };

    var _Scene_Title_createCommandWindow      = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        if (ANGSettingManager.visible)
            this._commandWindow.setHandler('nameGame2', this.commandNewGameSecond.bind(this));
    };

    Scene_Title.prototype.fadeOutAll = function() {
        if (!this._noFadeout) {
            Scene_Base.prototype.fadeOutAll.apply(this, arguments);
        }
    };

    //=============================================================================
    // Scene_Load
    //  ロード成功時にアナザーポイントに移動します。
    //=============================================================================
    var _Scene_Load_onLoadSuccess      = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function() {
        _Scene_Load_onLoadSuccess.call(this);
        if (localExtraStage) {
            var mapId = parseInt(parameters['map_id'], 10) || 1;
            var x     = parseInt(parameters['map_x'], 10) || 1;
            var y     = parseInt(parameters['map_y'], 10) || 1;
            $gamePlayer.reserveTransfer(mapId, x, y);
            $gameMap.abortInterpreter();
            DataManager.selectSavefileForNewGame();
        }
    };

    //=============================================================================
    // Window_TitleCommand
    //  アナザーニューゲームの選択肢を追加定義します。
    //=============================================================================
    var _Window_TitleCommand_makeCommandList      = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);
        if (ANGSettingManager.visible) {
            this.addCommand(parameters['name'], 'nameGame2', ANGSettingManager.enable);
            var addPosition = parseInt(parameters['add_position'], 10);
            if (addPosition > 0) {
                var anotherCommand = this._list.pop();
                this._list.splice(addPosition - 1, 0, anotherCommand);
            }
        }
        if (ANGSettingManager.newGameHidden) {
            this.eraseCommandNewGame();
        }
    };

    Window_TitleCommand.prototype.eraseCommandNewGame = function() {
        this._list = this._list.filter(function(command) {
            return command.symbol !== 'newGame';
        })
    };

    var _Window_TitleCommand_updatePlacement      = Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function() {
        _Window_TitleCommand_updatePlacement.call(this);
        if (ANGSettingManager.visible) this.y += this.height / 8;
    };

    //=============================================================================
    // ANGManager
    //  アナザーニューゲームの設定ファイルのセーブとロードを定義します。
    //=============================================================================
    function ANGSettingManager() {
        throw new Error('This is a static class');
    }
    ANGSettingManager._fileId = -1001;

    ANGSettingManager.visible       = false;
    ANGSettingManager.enable        = false;
    ANGSettingManager.newGameHidden = false;

    ANGSettingManager.make = function() {
        var info           = {};
        info.visible       = this.visible;
        info.enable        = this.enable;
        info.newGameHidden = this.newGameHidden;
        return info;
    };

    ANGSettingManager.loadData = function() {
        var info           = this.load();
        this.visible       = (info['visible'] !== undefined ? info['visible'] : !getArgBoolean(parameters['hidden']));
        this.enable        = (info['enable'] !== undefined ? info['enable'] : !getArgBoolean(parameters['disable']));
        this.newGameHidden = info['newGameHidden'] || false;
    };

    ANGSettingManager.load = function() {
        var json;
        try {
            json = StorageManager.load(this._fileId);
        } catch (e) {
            console.error(e);
            return [];
        }
        if (json) {
            return JSON.parse(json);
        } else {
            return [];
        }
    };

    ANGSettingManager.save = function() {
        var info = ANGSettingManager.make();
        StorageManager.save(this._fileId, JSON.stringify(info));
    };

    //=============================================================================
    // StorageManager
    //  アナザーニューゲームの設定ファイルのパス取得処理を追加定義します。
    //=============================================================================
    var _StorageManager_localFilePath = StorageManager.localFilePath;
    StorageManager.localFilePath      = function(savefileId) {
        if (savefileId === ANGSettingManager._fileId) {
            return this.localFileDirectoryPath() + 'AnotherNewGame.rpgsave';
        } else {
            return _StorageManager_localFilePath.call(this, savefileId);
        }
    };

    var _StorageManager_webStorageKey = StorageManager.webStorageKey;
    StorageManager.webStorageKey      = function(savefileId) {
        if (savefileId === ANGSettingManager._fileId) {
            return 'RPG AnotherNewGame' + parameters['manage_number'];
        } else {
            return _StorageManager_webStorageKey.call(this, savefileId);
        }
    };
})();