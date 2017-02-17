
use bacchus_DMSData

GO
IF NOT EXISTS  (SELECT 1 from sys.types WHERE name = 'ORDER_TYPE')
BEGIN
	CREATE TYPE dbo.ORDER_TYPE AS TABLE(
	OrderID varchar(100) ,
	Manager varchar(100) ,
	TTID bigint ,
	RouteID bigint ,
	CreateDate datetime ,
	deliveryType int ,
	ln float ,
	lg float ,
	Comment varchar(500) ,
	PayFormID int ,
	ProdId int ,
	P_Discount float ,
	P_QTY float ,
	P_SUM float ,
	P_SUMD float ,
	T_QTY float ,
	T_SUM float ,
	T_SumD float 
)
END

GO
IF NOT EXISTS  (SELECT 1 from sys.types WHERE name = 'STOCKS_TYPE')
BEGIN
CREATE TYPE dbo.STOCKS_TYPE AS TABLE(
	RouteID bigint ,
	ProductId int ,
	QTY float 
)
END
GO

GO
IF NOT EXISTS  (SELECT 1 from sys.types WHERE name = 'TTANSWERS_TYPE')
BEGIN
CREATE TYPE dbo.TTANSWERS_TYPE AS TABLE(
	AnsID bigint ,
	Date datetime ,
	ln float ,
	lg float ,
	Answer varchar(400) ,
	isReject int 
)
END
GO

IF NOT EXISTS (SELECT 1
					FROM sys.schemas
						WHERE name  = 'apk' )
BEGIN
	exec ('CREATE SCHEMA apk')
END

IF NOT EXISTS (SELECT 1 from sys.asymmetric_keys WHERE name = 'PassAPK_Encod')
BEGIN
	CREATE ASYMMETRIC KEY PassAPK_Encod 
	   WITH ALGORITHM = RSA_2048 
		ENCRYPTION BY PASSWORD = N'biservan124asfasflgoritmsforasd8889824pass1124@##@$%%!$jhdvbasd'; 
END



GO
IF OBJECT_ID('apk.getPass') IS NOT NULL
  DROP FUNCTION apk.getPass
GO
CREATE function apk.getPass (@Pass varbinary(max))
RETURNS nvarchar (max)
AS
BEGIN
	RETURN convert(nvarchar(128),DecryptByAsymKey(AsymKey_ID('PassAPK_Encod'),@Pass, N'biservan124asfasflgoritmsforasd8889824pass1124@##@$%%!$jhdvbasd'))
END

GO
IF OBJECT_ID('apk.setPass') IS NOT NULL
  DROP FUNCTION apk.setPass
GO
CREATE function apk.setPass (@Pass nvarchar (max) )
RETURNS varbinary(max)
as
BEGIN
	RETURN EncryptByAsymKey(AsymKey_ID('PassAPK_Encod'),@Pass)
END

GO

/* check for schema web*/
IF NOT EXISTS  (SELECT 1
					FROM sys.schemas
						WHERE name  = 'web' )

	BEGIN
		exec ('CREATE SCHEMA web')

		CREATE TABLE  web.USERS(
			ID INT IDENTITY PRIMARY KEY,
			UserLogin varchar (80) ,
			UserPass varbinary(max),
			FirstName varchar (200),
			LastName varchar (200),
			Email varchar (200),
			IsActive tinyint not null default 0,
			Photo varchar (300) not null default '-',
			WebID varchar (100),
			BuyerID int not null default 0,
			last_ln float,
			last_lg float,
			is_online bit,
			last_date datetime
		)
	END	
ELSE
	BEGIN
		IF NOT EXISTS (SELECT	1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
											AND TA.name = 'USERS'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'BuyerID')
		BEGIN
			ALTER TABLE  web.USERS
				ADD BuyerID int not null default 0 
		END
	END


/* check for proc  web.getLogin*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'getLogin'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.getLogin
END


GO
CREATE PROC web.getLogin (@login varchar (100), @pass varchar (100))
AS 
BEGIN
	SELECT ID, UserLogin, FirstName, LastName, Email,Photo,WebID, apk.getPass(UserPass) as pass
		FROM web.USERS 
		WHERE UserLogin = @login
		AND  apk.getPass(UserPass) = @pass
END
GO





/*ALTER TABLE  SPRSOSKU*/
IF EXISTS  (SELECT  1 
				from sys.tables 
				WHERE name  = 'sprSOSku'
			)
BEGIN 
	IF NOT EXISTS (SELECT	1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'Coeficient')
	BEGIN
		ALTER TABLE  sprSOSku
			ADD Coeficient float NOT NULL DEFAULT 1
	END

	IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'Color')
	BEGIN
		ALTER TABLE  sprSOSku
			ADD Color varchar (200) NOT NULL DEFAULT '92,106,112'
	END
	IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'SortOrder')
	BEGIN
		ALTER TABLE  sprSOSku
			ADD SortOrder int NOT NULL DEFAULT 1
	END

	IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'SHOULD_BE')
	BEGIN
		ALTER TABLE  sprSOSku
			ADD SHOULD_BE TINYINT NOT NULL DEFAULT 1
	END

	IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'ID' )

	BEGIN
		IF EXISTS  (SELECT 1
					FROM sys.columns
						WHERE  [object_id] = Object_ID('sprSOSku')
						AND   is_identity = 1)
			BEGIN
				DECLARE  @IDENTITI_SKU varchar (100) = (SELECT name
															from sys.columns
															where [object_id] = Object_ID('sprSOSku')
															AND  is_identity = 1 )
				exec('ALTER TABLE  sprSOSku ADD ID AS  '+@IDENTITI_SKU)
			END
		ELSE
			BEGIN
				ALTER TABLE  sprSOSku ADD ID INT IDENTITY
			END 

		
	END
END



IF NOT EXISTS (SELECT 1
				from sys.indexes
				WHERE [object_id] = Object_ID('sprSOSku')
				AND  name = 'IX_WEB_SKU_GET') 

BEGIN
	CREATE NONCLUSTERED INDEX IX_WEB_SKU_GET ON sprSOSku (SHOULD_BE,BuyerID, ProductID )
	INCLUDE (ID, SkuName,SkuEAN,SortOrder ,Coeficient,Color,SkuUnit)
END

GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'VisitControl')
BEGIN
CREATE TABLE  web.VisitControl (
	ID int IDENTITY PRIMARY KEY,
	RouteID int,
	ttID int,
	LN float,
	LG float,
	PhoneTime datetime,
	VisitComment varchar(500),
	IsOnline tinyint,
	isReject int,
	CurentTime datetime not null default CURRENT_TIMESTAMP,
)

END




GO

/*check for proc web.GET_ProList*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_ProList'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_ProList
END
GO


CREATE PROC web.GET_ProList @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass([UserPass]) =@pass)
	BEGIN	
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT SK.ID as id,SK.SkuName as name, SK.SkuEAN as ean
			,PR.Picture as pic,PR.Category as cat 
		,SK.SortOrder as sort,SK.Coeficient as coef,SK.Color as color, SK.SkuUnit as V
		from dbo.sprSOSku SK
			INNER JOIN dbo.sprSOProducts PR
				ON PR.ProductID =  SK.ProductID
		WHERE SK.ProductID > 0
			AND SK.SHOULD_BE = 1
			AND SK.BuyerID = @DISRT
	END
END

GO


/*check table web.PayForms*/

IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'PayForms')
BEGIN
	CREATE TABLE  web.PayForms (
		ID INT IDENTITY PRIMARY KEY,
		Name varchar (200) not null DEFAULT '-',
		BuyerID int NOT NULL DEFAULT 0
	)

	CREATE NONCLUSTERED INDEX IX_PayForms_BYBuyerID on web.PayForms (BuyerID)
		INCLUDE (ID,Name)
END

GO

/*check for proc web.GET_FORMS*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_FORMS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_FORMS
END
GO
CREATE PROC web.GET_FORMS  @login varchar (100), @pass varchar (100) 
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass([UserPass]) =@pass)
	BEGIN	
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT ID as id, Name as name
		from web.PayForms
		WHERE BuyerID = @DISRT
			
	END
END

GO


/*check table web.PriceListMain*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'PriceListMain')
BEGIN
	CREATE TABLE  web.PriceListMain (
		ID int IDENTITY PRIMARY KEY,
		BuyerID int NOT NULL DEFAULT 0,
		PayForm int NOT NULL DEFAULT 0,
		ProductID int NOT NULL DEFAULT 0,
		Price float not null default 0,
		Discount float 
	)

	CREATE NONCLUSTERED INDEX IX_PriceListMain_SEARCH ON web.PriceListMain (BuyerID)
		INCLUDE (PayForm,ProductID,Price,Discount)
END
go
/*check for proc web.GET_MainPriceList*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_MainPriceList'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_MainPriceList
END
GO
CREATE PROC web.GET_MainPriceList @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from  web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT ProductID as ProdId,PayForm as Form,Price, Discount
		from web.PriceListMain
		WHERE BuyerID = @DISRT
		--ORDER BY ProductID -- should be sorted!!!
	END
END

go









/*check table web.Routes*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Routes')
BEGIN
	CREATE TABLE  web.Routes (
		ID int IDENTITY PRIMARY KEY,
		UsrLogin varchar (30) NOT NULL DEFAULT '-',
		TTID int NOT NULL DEFAULT 0,
		VisitDay date NOT NULL DEFAULT CURRENT_TIMESTAMP
	)

	CREATE NONCLUSTERED INDEX IX_Routes_MAIN ON web.Routes (UsrLogin,VisitDay)
		INCLUDE (ID,TTId)
	CREATE NONCLUSTERED INDEX IX_Routes_TTSEARCH ON web.Routes (UsrLogin,TTId)
END

/*check for proc web.GET_Routes*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_Routes'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_Routes
END
GO
CREATE PROC web.GET_Routes @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass))
	BEGIN
		SELECT  RO.ID as id, VisitDay as visit,RO.TTID as ttid ,case
																	when EXISTS (SELECT 1
																					FROM web.VisitControl V
																					WHERE V.RouteID = RO.ID)
																		then 1
																	else 0
																end isVisit, 
																(SELECT MAX(VisitComment)
																	 from web.VisitControl V
																	 WHERE V.RouteID = RO.ID )  reject
		from web.Routes  RO
		WHERE UsrLogin  =  @login 
		AND VisitDay >= CAST(CURRENT_TIMESTAMP as DATE)
	END
END

GO






/*check table web.PriceListMain*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'TTPriceList')
BEGIN
	CREATE TABLE  web.TTPriceList (
		ID int IDENTITY PRIMARY KEY,
		BuyerID int NOT NULL DEFAULT 0,
		TTID int NOT NULL DEFAULT 0,
		PayForm int NOT NULL DEFAULT 0,
		ProductID int NOT NULL DEFAULT 0,
		Price float,
		Discount float 
	)

	CREATE NONCLUSTERED INDEX IX_TTPriceList_SEARCH ON web.TTPriceList (BuyerID,TTID)
		INCLUDE (PayForm,ProductID,Price,Discount)
END




/*check for proc web.GET_MainPriceList*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_TTPrices'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_TTPrices
END
GO
CREATE PROC web.GET_TTPrices @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1  from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT TTID as ttID , ProductID as ProdId,PayForm as Form,Price, Discount 
		from  web.TTPriceList  TP
		WHERE BuyerID = @DISRT
			AND EXISTS (SELECT 1
							FROM web.USERS_TT TRT
							WHERE UserLogin = @login 
								AND TRT.TTID =  TP.ttID)
		--ORDER BY ProductID -- should be sorted!!!
	END
END

GO





/*check table web.Tasks*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Tasks')
BEGIN
	CREATE TABLE  web.Tasks (
		ID int IDENTITY PRIMARY KEY,
		Name varchar(200) ,
		ActionType tinyint ,
		[Action] int ,
		Question varchar(500) ,
		Alternatives varchar(max) ,
		[Description] varchar(500) ,
		IsFixed tinyint NOT NULL default 0,
		Multiple tinyint NOT NULL default 0 
	)

	INSERT INTO web.Tasks  VALUES
	('question1', 1, 1, 'Äàéòå îöåíêó ÒÒ', 'Äàéòå îöåíêó ÒÒ', 'Îöåíêà òîðãîâîãî ïðåäñòàâèòåëÿ', 0, 0), 
	('question2', 1, 2, 'Âûáåðèòå òèï ÒÒ', 'Âûáåðèòå òèï ÒÒ', 'òèï ÒÒ', 0, 0), 
	('question3', 1, 3, 'ÒÒ èìååò íàðóæíóþ ðåêëàìó?', null , 'íàðóæíàÿ ðåêëàìà', 0, 0), 
	('question4', 1, 4, 'Äàéòå îöåíêó ÒÒ ïî 100-áàëüíîé øêàëå', 'Äàéòå îöåíêó ÒÒ ïî 100-áàëüíîé øêàëå', 'îöåíêà 100', 0, 0), 
	('question5', 1, 5, 'Äàéòå îöåíêó ÒÒ ïî 10-áàëüíîé øêàëå', 'Äàéòå îöåíêó ÒÒ ïî 10-áàëüíîé øêàëå', 'îöåíêà 10', 0, 0), 
	('question6', 1, 6, 'Êàêîå âàøå ìíåíèå î ëîÿëüíîñòè êëèåíòà', null , 'ìíåíèå ÒÒ', 0, 0), 
	('question7', 1, 7, 'Ñäåëàéòå ôîòî ôàñàäà çäàíèÿ', null , 'ôîòî ôàñàäà', 0, 1), 
	('question9', 2, 1, 'Äàéòå îöåíêó âûêëàäêè ïðîäóêòà', 'Äàéòå îöåíêó âûêëàäêè ïðîäóêòà', null , 0, 0), 
	('question10', 2, 2, 'Äàéòå îöåíêó âûêëàäêè ïðîäóêòà', 'Äàéòå îöåíêó âûêëàäêè ïðîäóêòà', null , 0, 0), 
	('question11', 2, 3, 'Çàìåòèëè Âû ïðîñòðî÷åííûé ïðîäóêò?', null , null , 0, 0), 
	('question12', 2, 4, 'Ñêîëüêî òîâàðà íà ïîëêå', 'Ñêîëüêî òîâàðà íà ïîëêå', null , 0, 0), 
	('question13', 2, 5, 'Äàéòå îöåíêó âûêëàäêè', 'Äàéòå îöåíêó âûêëàäêè', null , 0, 0), 
	('question15', 2, 7, 'Ñäåëàéòå ôîòî òîâàðà', null , null , 0, 0), 
	('question18', 2, 10, 'Èçìåíèòü öåíó', null , 'ðåäàêòèðîâàòü öåíó', 1, 0), 
	('new_order', 2, 11, 'Ñäåëàòü çàêàç', null , 'Ôîðìà ñîçäàíèÿ çàêàçà', 1, 0)
END


GO

/*check table web.Actions*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Actions')
BEGIN
	CREATE TABLE  web.Actions (
		ID int IDENTITY PRIMARY KEY,
		Name varchar(200) 
	)

	INSERT INTO web.Actions VALUES
	('Checkbox'),('Radiobuttons'),('YES/NO'),('Rate'),('Bar'),
	('TextAnswer'),('Photo'),('Barscan'),('Integer'),('Float'),('Order')
END

/*check table web.ActionTypes*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'ActionTypes')
BEGIN
	CREATE TABLE  web.ActionTypes (
		ID int IDENTITY PRIMARY KEY,
		Name varchar(100) 
	)
	INSERT INTO web.ActionTypes VALUES ('Ïî ÒÒ'),('Ïî ïðîäóêòàì')
END




GO


/*check for proc web.get_Actions*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_Actions'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_Actions
END
GO
CREATE PROC web.get_Actions @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		SELECT T.ID as id, T.ActionType as type, T.[Action] as act,
			T.Question as quest,T.Alternatives as ans, T.IsFixed as fix, T.multiple as mult
		from web.Tasks  T
	END
END

GO




IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOOutlets'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'ID' )

BEGIN
	IF EXISTS  (SELECT 1
				FROM sys.columns
					WHERE  [object_id] = Object_ID('sprSOOutlets')
					AND   is_identity = 1)
		BEGIN
			DECLARE  @IDENTITI_SKU varchar (100) = (SELECT name
														from sys.columns
														where [object_id] = Object_ID('sprSOOutlets')
														AND  is_identity = 1 )
			exec('ALTER TABLE  sprSOOutlets ADD ID AS  '+@IDENTITI_SKU)
		END
	ELSE
		BEGIN
			ALTER TABLE  sprSOOutlets ADD ID INT IDENTITY
		END 
END



go

IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOOutlets'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'ln' )
BEGIN
	ALTER TABLE  sprSOOutlets ADD ln float 
END

IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOOutlets'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'lg' )
BEGIN
	ALTER TABLE  sprSOOutlets ADD lg float 
END


IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOOutlets'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'ClientsID' )
BEGIN
	ALTER TABLE  sprSOOutlets ADD ClientsID int not null default 0 
END


go




/*check for proc web.get_Magazines*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_Magazines'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_Magazines
END
GO
CREATE PROC web.get_Magazines @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT  OU.ID as id, OU.CustOutletName as name,OutletAddress as addr, 
			OU.ln, OU.lg,ClientsID as clID
			FROM sprSOOutlets OU
			WHERE BuyerID =  @DISRT
			AND EXISTS (SELECT 1
							FROM web.USERS_TT RT
							WHERE RT.UserLogin = @login
									AND RT.TTID = OU.ID)
	END
END

GO


IF NOT EXISTS (SELECT 1
				from sys.indexes
				WHERE [object_id] = Object_ID('sprSOOutlets')
				AND  name = 'IX_WEB_sprSOOutlets_SEARCH') 

BEGIN
	CREATE NONCLUSTERED INDEX IX_WEB_sprSOOutlets_SEARCH ON sprSOOutlets (BuyerID,ID )
	INCLUDE (CustOutletName,OutletAddress,ln,lg,ClientsID)
END


GO 



/*check table web.Clients*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Clients')
BEGIN
	CREATE TABLE  web.Clients (
		ID int IDENTITY PRIMARY KEY,
		CL_REF varchar (300) NOT NULL,
		Name varchar (500) ,
		PayDays int not null default 0
	)
	
END


/*check table web.ClientsPayForms*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'ClientsPayForms')
BEGIN
	CREATE TABLE  web.ClientsPayForms (
		ID int IDENTITY PRIMARY KEY,
		ClientID int not null,
		PayFormID int not null
	)
	
	CREATE NONCLUSTERED INDEX IX_ClientsPayForms_SETT ON web.ClientsPayForms (ClientID)
		INCLUDE (PayFormID)
END



/*check table web.Discounts*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Discounts')
BEGIN
	CREATE TABLE  web.Discounts (
		ID int IDENTITY PRIMARY KEY,
		TTiD int not null,
		PayFormID int not null,
		Comment varchar (max) not null default '-',
		Discount float
	)
	
	CREATE NONCLUSTERED INDEX IX_Discounts_SEARCH ON web.Discounts (PayFormID,TTiD)
		INCLUDE (Comment, Discount)
END




/*check for proc web.get_MagazinesDiscounts*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_MagazinesDiscounts'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_MagazinesDiscounts
END
GO
CREATE PROC web.get_MagazinesDiscounts @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		SELECT TTID ttID, PayFormID pf , Comment com, Discount disc
			FROM  web.Discounts DI
			WHERE EXISTS (SELECt 1
							FROM web.USERS_TT TT
							WHERE TT.UserLogin = @login
							AND TT.TTID = DI.TTiD)
	END
END

GO



GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'PRODQuestionAnswers')
BEGIN
CREATE TABLE  web.PRODQuestionAnswers (
	ID bigint IDENTITY PRIMARY KEY,
	AnswerId bigint,
	ProductId int,
	RouteID bigint,
	ttID int,
	ActionID int,
	AnswerType int ,
	Answer varchar(max),
	Ln float,
	Lg float,
	IsPhoto int,
	DDate date,
)


END


GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'TTQuestionAnswers')
BEGIN
CREATE TABLE  web.TTQuestionAnswers (
	ID bigint IDENTITY PRIMARY KEY,
	AnswerId bigint,
	RouteID bigint,
	ActionID int,
	ttid int,
	AnswerType int,
	Answer varchar(max),
	Ln float,
	Lg float,
	IsPhoto int,
	DDate date 
)


END
GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'Warehouse')
BEGIN
CREATE TABLE  web.Warehouse (
	ID bigint IDENTITY PRIMARY KEY,
	ttID int,
	ProdId int,
	QTY float,
	Ddate date
)

CREATE NONCLUSTERED INDEX IX_Warehouse_SEARCH ON web.Warehouse (ttID)
	INCLUDE (ProdId,QTY)

END




GO 
/*check table web.RouteActions*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'RouteActions')
BEGIN
	CREATE TABLE  web.RouteActions (
		ID bigint IDENTITY PRIMARY KEY,
		RouteID bigint not null,
		ActionID bigint not null
	)
	
	CREATE NONCLUSTERED INDEX IX_RouteActions_SEARCH ON web.RouteActions (RouteID)
		INCLUDE (ActionID)
END


GO

/*check for proc web.get_Magazines*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_RouteActions'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_RouteActions
END
GO
CREATE PROC web.get_RouteActions @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT  OU.RouteID rID, OU.ActionID act, OU.ID id
			FROM web.RouteActions OU
			WHERE  EXISTS (SELECT 1
							FROM web.Routes RO
							WHERE RO.UsrLogin = @login
									AND RO.ID = OU.RouteID
									AND  RO.VisitDay >= CAST(CURRENT_TIMESTAMP as DATE) )
	END
END

GO



GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'TTProducts')
BEGIN
CREATE TABLE  web.TTProducts (
	ID bigint IDENTITY PRIMARY KEY,
	TTID int,
	ProdID int,
	SortOrder int NOT NULL DEFAULT 0,
	Coef float NOT NULL DEFAULT 1,
	Color varchar(100) NOT NULL DEFAULT '92,106,112',
	Groups varchar(200) NOT NULL DEFAULT '-'
)
CREATE NONCLUSTERED INDEX IX_TTProducts_SEARCH ON web.TTProducts (TTID ASC)
	INCLUDE ( 	ProdID,SortOrder,Coef,Color,Groups)

END


GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'USERS_TT')
BEGIN
CREATE TABLE  web.USERS_TT (
	UserLogin  varchar(50) not null,
	TTID int not null
)

CREATE CLUSTERED INDEX IX_USER_TT ON  web.USERS_TT (UserLogin,TTID)
CREATE NONCLUSTERED INDEX IX_USER_TT_ByUser ON  web.USERS_TT (UserLogin) INCLUDE (TTID)
END

GO

/*check for proc web.get_MagazinesPayForms*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_MagazinesPayForms'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_MagazinesPayForms
END
GO
CREATE PROC web.get_MagazinesPayForms @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT  OU.ID, CLF.PayFormID pf
			FROM sprSOOutlets OU
			INNER JOIN web.ClientsPayForms CLF
				ON CLF.ClientID = OU.ClientsID
			WHERE  buyerID = @DISRT
			AND EXISTS (SELECT 1
							FROM web.USERS_TT UTT
							WHERE UTT.UserLogin = @login
									AND UTT.TTID = OU.ID)
	END
END

GO


IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'UPD_USER_ACTIVE'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.UPD_USER_ACTIVE
END
go

CREATE PROC web.UPD_USER_ACTIVE @ID int, @ACT int
AS
BEGIN
	UPDATE web.USERS 
		SET is_online = @ACT, last_date = CURRENT_TIMESTAMP
	WHERE ID = @ID
END
go


IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_VISIT'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_VISIT
END
go

CREATE PROC web.INS_VISIT @date datetime,@id int, @isReject int, @lg float, @ln float, @reject varchar (400)
AS
BEGIN
	INSERT INTO web.VisitControl (PhoneTime,RouteID,LN,LG,isReject,VisitComment,CurentTime)
	values (@date,@id,@ln,@lg,@isReject,@reject,CURRENT_TIMESTAMP)
END

go

IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'UPD_USER_GEO'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.UPD_USER_GEO
END
go

CREATE PROC web.UPD_USER_GEO @ID int, @LAT float ,@LNG float
AS
BEGIN
	UPDATE web.USERS 
		SET last_ln = @LAT,last_lg =@LNG, last_date = CURRENT_TIMESTAMP
	WHERE ID = @ID
END


GO



go

IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_WAREHOUSE'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_WAREHOUSE
END
go

CREATE PROC web.GET_WAREHOUSE  @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) = @pass)
	DECLARE @BuyreID int = (SELECT BuyerID from web.USERS WHERE UserLogin = @login)
	BEGIN
		
		SELECT ProdId as id, QTY as qty
		from web.Warehouse WH
			WHERE EXISTS (SELECT 1
							FROM sprSoSKU SK
								WHERE SK.ID = WH.ProdId
								AND SK.BuyerID = @BuyreID)

	END
END


GO




/*check table web.Orders*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Orders')
BEGIN
	CREATE TABLE web.Orders(
	ID bigint IDENTITY PRIMARY KEY,
	OrderID varchar(100) ,
	Manager varchar(100) ,
	TTID bigint ,
	RouteID bigint ,
	CreateDate datetime ,
	deliveryType int ,
	ln float ,
	lg float ,
	Comment varchar(500) ,
	PayFormID int ,
	ProdId int ,
	P_Discount float ,
	P_QTY float ,
	P_SUM float ,
	P_SUMD float ,
	T_QTY float ,
	T_SUM float ,
	T_SumD float ,
	ServerDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
)
	
	CREATE NONCLUSTERED INDEX IX_ORDER_SERCH_DUBL ON web.Orders (ProdId , RouteID ,OrderID )
END

GO

GO
/*check table web.Stocks*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Stocks')
BEGIN
	CREATE TABLE web.Stocks(
	ID bigint IDENTITY PRIMARY KEY,
	RouteID bigint ,
	ProductId int ,
	QTY float ,
)
	
	CREATE NONCLUSTERED INDEX IX_STOCKS_SEARCH ON web.Stocks (ProductId ,RouteID )
END

GO

GO
/*check table web.Transitions*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Transitions')
BEGIN
	CREATE TABLE web.Transitions(
	ID bigint IDENTITY PRIMARY KEY,
	TRANSITION varchar(100) ,
	ORDERID varchar(100) ,
	JSON nvarchar(max) 
)
END

GO


GO
/*check table web.TTAnswer*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'TTAnswer')
BEGIN
	CREATE TABLE web.TTAnswer(
		ID bigint IDENTITY PRIMARY KEY,
		AnsID bigint ,
		Date datetime ,
		ln float ,
		lg float ,
		Answer varchar(400) ,
		isReject int 
	)

	CREATE NONCLUSTERED INDEX IX_TT_ANSWERS_SEARCH ON web.TTAnswer (AnsID ,[Date] )
END

GO


GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'DEL_ORDER'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.DEL_ORDER
END
go

CREATE PROC web.DEL_ORDER @OrderId varchar (100), @RouteID bigint
AS
BEGIN
		UPDATE ST
		SET ST.QTY = ST.QTY + O.P_QTY
		FROM web.Warehouse ST
			INNER JOIN  web.Orders O 
				ON ST.ProdId = O.ProdId
		WHERE O.OrderID = @OrderID 
			AND O.RouteID = @RouteID

		SELECT ProdId as id, QTY as qty
		into #WH_CH
		from web.Warehouse WH
		WHERE EXISTS (SELECT 1
							FROM web.Orders O
							WHERE O.ProdId = WH.ProdId
								AND O.RouteID =@RouteID
								AND O.OrderID = @OrderID )

		DELETE FROM web.Orders 
		WHERE RouteID =@RouteID 
		AND OrderID = @OrderID

		SELECT *
		FROM  #WH_CH
END

GO




GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_CHANGEDSTOCKS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_CHANGEDSTOCKS
END
go

CREATE PROC web.GET_CHANGEDSTOCKS @OrderID varchar (100), @RouteID int
AS 
	BEGIN
		SELECT ProdId as id, QTY as qty
		from web.Warehouse WH
		WHERE EXISTS (SELECT 1
							FROM web.Orders O
							WHERE O.ProdId = WH.ProdId
								AND O.RouteID =@RouteID
								AND O.OrderID = @OrderID )
	END

GO

GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_ProByTT'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_ProByTT
END
go

CREATE PROC web.GET_ProByTT @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT  TP.TTID ttId, TP.ProdID, TP.SortOrder sort,
				TP.Color col, TP.Groups gr
			FROM web.TTProducts TP
			WHERE EXISTS (SELECT 1
								FROM web.USERS_TT UT
								WHERE UT.UserLogin = @login
									AND TP.TTID = UT.TTID
									)
	END
END


GO

GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'Get_TT'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.Get_TT
END
go

CREATE PROC web.Get_TT @login varchar (30) , @pass varchar (30)
AS 
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		SELECT  RO.ID as id, OU.Name as name,  OU.[Address] as addr,  OU.Picture as pic, 
		OU.LG as lg, OU.ln as ln, VisitDay as visit,RO.TTID as ttid ,
		OU.PayForms as payForms, OU.Discounts as disc,
		-- info about visit if exists
		0 as isVisit ,'-' reject
		from apk.Routes  RO
			LEFT JOIN apk.Outlets OU
				ON RO.TTID  = OU.ID
		WHERE UsrLogin  = @login 
	END
END


GO



GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_ORDER'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_ORDER
END
go

CREATE PROC web.INS_ORDER (@order ORDER_TYPE readonly)
AS
BEGIN
	--DELETE PREVIOUS IF EXIST (SOMETHING THAT SHOULD NEVER HEPPEN)
	DELETE FROM web.Orders 
		WHERE EXISTS (SELECT 1
							FROM @order O
								WHERE O.ProdId =  web.Orders.ProdId 
									AND O.RouteID =  web.Orders.RouteID
									AND O.OrderID =  web.Orders.OrderID)


	-- INSERT RECORDS
	INSERT INTO web.Orders (OrderID,Manager,TTID,RouteID,CreateDate ,deliveryType ,
	ln,lg,Comment,PayFormID,ProdId,P_Discount,P_QTY,P_SUM,P_SUMD,T_QTY,T_SUM,T_SumD)
	SELECT OrderID,Manager,TTID,RouteID,CreateDate ,deliveryType ,
		ln,lg,Comment,PayFormID,ProdId,P_Discount,P_QTY,P_SUM,P_SUMD,T_QTY,T_SUM,T_SumD
	from @order

	--UPDATE STOCKS
	DECLARE @OrderID varchar(100), @RouteID int
	SELECT TOP 1 @OrderID = OrderID ,@RouteID = RouteID from @order
	UPDATE ST
		SET ST.QTY = CASE 
					WHEN ST.QTY - O.P_QTY <0 THEN 0
					ELSE ST.QTY - O.P_QTY
				END
	FROM web.Warehouse ST
		INNER JOIN  web.Orders O 
			ON ST.ProdId = O.ProdId
	WHERE O.OrderID = @OrderID 
		AND O.RouteID = @RouteID
END


GO


GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_STOCKS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_STOCKS
END
go

CREATE PROC web.INS_STOCKS (@stocks STOCKS_TYPE readonly)
AS
BEGIN
	DELETE FROM web.Stocks
	WHERE EXISTS (SELECT 1 
						FROM @stocks st
						WHERE st.ProductId =web.Stocks.ProductId
						AND st.RouteID = web.Stocks.RouteID )
	INSERT INTO web.Stocks (RouteID, ProductId, QTY)
	SELECT  RouteID, ProductId, QTY 
		FROM @stocks
END


GO

GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_TRANSITIONS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_TRANSITIONS
END
go

CREATE PROC web.INS_TRANSITIONS  @TRANSITION varchar (100),@ORDERID varchar (100),@JSON nvarchar (max)
AS
BEGIN
	INSERT INTO web.Transitions(TRANSITION,ORDERID,JSON)
	VALUES (@TRANSITION,@ORDERID,@JSON)
END


GO


GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_TTANSWERS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_TTANSWERS
END
go

CREATE PROC web.INS_TTANSWERS (@answers TTANSWERS_TYPE readonly)
AS
BEGIN
	DELETE FROM  web.TTAnswer
	WHERE EXISTS (SELECT 1
					FROM @answers A
					WHERE A.AnsID = web.TTAnswer.AnsID
					AND A.[Date] =web.TTAnswer.[Date] )
	INSERT INTO web.TTAnswer (AnsID, [Date],ln,lg,Answer,isReject)
	SELECT  AnsID, [Date],ln,lg,Answer,isReject
	FROM @answers
END


GO




































use bacchus_DMSData

GO
IF NOT EXISTS  (SELECT 1 from sys.types WHERE name = 'ORDER_TYPE')
BEGIN
	CREATE TYPE dbo.ORDER_TYPE AS TABLE(
	OrderID varchar(100) ,
	Manager varchar(100) ,
	TTID bigint ,
	RouteID bigint ,
	CreateDate datetime ,
	deliveryType int ,
	ln float ,
	lg float ,
	Comment varchar(500) ,
	PayFormID int ,
	ProdId int ,
	P_Discount float ,
	P_QTY float ,
	P_SUM float ,
	P_SUMD float ,
	T_QTY float ,
	T_SUM float ,
	T_SumD float 
)
END

GO
IF NOT EXISTS  (SELECT 1 from sys.types WHERE name = 'STOCKS_TYPE')
BEGIN
CREATE TYPE dbo.STOCKS_TYPE AS TABLE(
	RouteID bigint ,
	ProductId int ,
	QTY float 
)
END
GO

GO
IF NOT EXISTS  (SELECT 1 from sys.types WHERE name = 'TTANSWERS_TYPE')
BEGIN
CREATE TYPE dbo.TTANSWERS_TYPE AS TABLE(
	AnsID bigint ,
	Date datetime ,
	ln float ,
	lg float ,
	Answer varchar(400) ,
	isReject int 
)
END
GO

IF NOT EXISTS (SELECT 1
					FROM sys.schemas
						WHERE name  = 'apk' )
BEGIN
	exec ('CREATE SCHEMA apk')
END

IF NOT EXISTS (SELECT 1 from sys.asymmetric_keys WHERE name = 'PassAPK_Encod')
BEGIN
	CREATE ASYMMETRIC KEY PassAPK_Encod 
	   WITH ALGORITHM = RSA_2048 
		ENCRYPTION BY PASSWORD = N'biservan124asfasflgoritmsforasd8889824pass1124@##@$%%!$jhdvbasd'; 
END



GO
IF OBJECT_ID('apk.getPass') IS NOT NULL
  DROP FUNCTION apk.getPass
GO
CREATE function apk.getPass (@Pass varbinary(max))
RETURNS nvarchar (max)
AS
BEGIN
	RETURN convert(nvarchar(128),DecryptByAsymKey(AsymKey_ID('PassAPK_Encod'),@Pass, N'biservan124asfasflgoritmsforasd8889824pass1124@##@$%%!$jhdvbasd'))
END

GO
IF OBJECT_ID('apk.setPass') IS NOT NULL
  DROP FUNCTION apk.setPass
GO
CREATE function apk.setPass (@Pass nvarchar (max) )
RETURNS varbinary(max)
as
BEGIN
	RETURN EncryptByAsymKey(AsymKey_ID('PassAPK_Encod'),@Pass)
END

GO

/* check for schema web*/
IF NOT EXISTS  (SELECT 1
					FROM sys.schemas
						WHERE name  = 'web' )

	BEGIN
		exec ('CREATE SCHEMA web')

		CREATE TABLE  web.USERS(
			ID INT IDENTITY PRIMARY KEY,
			UserLogin varchar (80) ,
			UserPass varbinary(max),
			FirstName varchar (200),
			LastName varchar (200),
			Email varchar (200),
			IsActive tinyint not null default 0,
			Photo varchar (300) not null default '-',
			WebID varchar (100),
			BuyerID int not null default 0,
			last_ln float,
			last_lg float,
			is_online bit,
			last_date datetime
		)
	END	
ELSE
	BEGIN
		IF NOT EXISTS (SELECT	1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
											AND TA.name = 'USERS'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'BuyerID')
		BEGIN
			ALTER TABLE  web.USERS
				ADD BuyerID int not null default 0 
		END
	END


/* check for proc  web.getLogin*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'getLogin'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.getLogin
END


GO
CREATE PROC web.getLogin (@login varchar (100), @pass varchar (100))
AS 
BEGIN
	SELECT ID, UserLogin, FirstName, LastName, Email,Photo,WebID, apk.getPass(UserPass) as pass
		FROM web.USERS 
		WHERE UserLogin = @login
		AND  apk.getPass(UserPass) = @pass
END
GO





/*ALTER TABLE  SPRSOSKU*/
IF EXISTS  (SELECT  1 
				from sys.tables 
				WHERE name  = 'sprSOSku'
			)
BEGIN 
	IF NOT EXISTS (SELECT	1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'Coeficient')
	BEGIN
		ALTER TABLE  sprSOSku
			ADD Coeficient float NOT NULL DEFAULT 1
	END

	IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'Color')
	BEGIN
		ALTER TABLE  sprSOSku
			ADD Color varchar (200) NOT NULL DEFAULT '92,106,112'
	END
	IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'SortOrder')
	BEGIN
		ALTER TABLE  sprSOSku
			ADD SortOrder int NOT NULL DEFAULT 1
	END

	IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'SHOULD_BE')
	BEGIN
		ALTER TABLE  sprSOSku
			ADD SHOULD_BE TINYINT NOT NULL DEFAULT 1
	END

	IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOSku'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'ID' )

	BEGIN
		IF EXISTS  (SELECT 1
					FROM sys.columns
						WHERE  [object_id] = Object_ID('sprSOSku')
						AND   is_identity = 1)
			BEGIN
				DECLARE  @IDENTITI_SKU varchar (100) = (SELECT name
															from sys.columns
															where [object_id] = Object_ID('sprSOSku')
															AND  is_identity = 1 )
				exec('ALTER TABLE  sprSOSku ADD ID AS  '+@IDENTITI_SKU)
			END
		ELSE
			BEGIN
				ALTER TABLE  sprSOSku ADD ID INT IDENTITY
			END 

		
	END
END



IF NOT EXISTS (SELECT 1
				from sys.indexes
				WHERE [object_id] = Object_ID('sprSOSku')
				AND  name = 'IX_WEB_SKU_GET') 

BEGIN
	CREATE NONCLUSTERED INDEX IX_WEB_SKU_GET ON sprSOSku (SHOULD_BE,BuyerID, ProductID )
	INCLUDE (ID, SkuName,SkuEAN,SortOrder ,Coeficient,Color,SkuUnit)
END

GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'VisitControl')
BEGIN
CREATE TABLE  web.VisitControl (
	ID int IDENTITY PRIMARY KEY,
	RouteID int,
	ttID int,
	LN float,
	LG float,
	PhoneTime datetime,
	VisitComment varchar(500),
	IsOnline tinyint,
	isReject int,
	CurentTime datetime not null default CURRENT_TIMESTAMP,
)

END




GO

/*check for proc web.GET_ProList*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_ProList'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_ProList
END
GO


CREATE PROC web.GET_ProList @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass([UserPass]) =@pass)
	BEGIN	
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT SK.ID as id,SK.SkuName as name, SK.SkuEAN as ean
			,PR.Picture as pic,PR.Category as cat 
		,SK.SortOrder as sort,SK.Coeficient as coef,SK.Color as color, SK.SkuUnit as V
		from dbo.sprSOSku SK
			INNER JOIN dbo.sprSOProducts PR
				ON PR.ProductID =  SK.ProductID
		WHERE SK.ProductID > 0
			AND SK.SHOULD_BE = 1
			AND SK.BuyerID = @DISRT
	END
END

GO


/*check table web.PayForms*/

IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'PayForms')
BEGIN
	CREATE TABLE  web.PayForms (
		ID INT IDENTITY PRIMARY KEY,
		Name varchar (200) not null DEFAULT '-',
		BuyerID int NOT NULL DEFAULT 0
	)

	CREATE NONCLUSTERED INDEX IX_PayForms_BYBuyerID on web.PayForms (BuyerID)
		INCLUDE (ID,Name)
END

GO

/*check for proc web.GET_FORMS*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_FORMS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_FORMS
END
GO
CREATE PROC web.GET_FORMS  @login varchar (100), @pass varchar (100) 
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass([UserPass]) =@pass)
	BEGIN	
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT ID as id, Name as name
		from web.PayForms
		WHERE BuyerID = @DISRT
			
	END
END

GO


/*check table web.PriceListMain*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'PriceListMain')
BEGIN
	CREATE TABLE  web.PriceListMain (
		ID int IDENTITY PRIMARY KEY,
		BuyerID int NOT NULL DEFAULT 0,
		PayForm int NOT NULL DEFAULT 0,
		ProductID int NOT NULL DEFAULT 0,
		Price float not null default 0,
		Discount float 
	)

	CREATE NONCLUSTERED INDEX IX_PriceListMain_SEARCH ON web.PriceListMain (BuyerID)
		INCLUDE (PayForm,ProductID,Price,Discount)
END
go
/*check for proc web.GET_MainPriceList*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_MainPriceList'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_MainPriceList
END
GO
CREATE PROC web.GET_MainPriceList @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT ProductID as ProdId,PayForm as Form,Price, Discount
		from web.PriceListMain
		WHERE BuyerID = @DISRT
		--ORDER BY ProductID -- should be sorted!!!
	END
END

go









/*check table web.Routes*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Routes')
BEGIN
	CREATE TABLE  web.Routes (
		ID int IDENTITY PRIMARY KEY,
		UsrLogin varchar (30) NOT NULL DEFAULT '-',
		TTID int NOT NULL DEFAULT 0,
		VisitDay date NOT NULL DEFAULT CURRENT_TIMESTAMP
	)

	CREATE NONCLUSTERED INDEX IX_Routes_MAIN ON web.Routes (UsrLogin,VisitDay)
		INCLUDE (ID,TTId)
	CREATE NONCLUSTERED INDEX IX_Routes_TTSEARCH ON web.Routes (UsrLogin,TTId)
END

/*check for proc web.GET_Routes*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_Routes'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_Routes
END
GO
CREATE PROC web.GET_Routes @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		SELECT  RO.ID as id, VisitDay as visit,RO.TTID as ttid ,case
																	when EXISTS (SELECT 1
																					FROM web.VisitControl V
																					WHERE V.RouteID = RO.ID)
																		then 1
																	else 0
																end isVisit, 
																(SELECT MAX(VisitComment)
																	 from web.VisitControl V
																	 WHERE V.RouteID = RO.ID )  reject
		from web.Routes  RO
		WHERE UsrLogin  =  @login 
		AND VisitDay >= CAST(CURRENT_TIMESTAMP as DATE)
	END
END

GO






/*check table web.PriceListMain*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'TTPriceList')
BEGIN
	CREATE TABLE  web.TTPriceList (
		ID int IDENTITY PRIMARY KEY,
		BuyerID int NOT NULL DEFAULT 0,
		TTID int NOT NULL DEFAULT 0,
		PayForm int NOT NULL DEFAULT 0,
		ProductID int NOT NULL DEFAULT 0,
		Price float,
		Discount float 
	)

	CREATE NONCLUSTERED INDEX IX_TTPriceList_SEARCH ON web.TTPriceList (BuyerID,TTID)
		INCLUDE (PayForm,ProductID,Price,Discount)
END




/*check for proc web.GET_MainPriceList*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_TTPrices'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_TTPrices
END
GO
CREATE PROC web.GET_TTPrices @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT TTID as ttID , ProductID as ProdId,PayForm as Form,Price, Discount 
		from  web.TTPriceList  TP
		WHERE BuyerID = @DISRT
			AND EXISTS (SELECT 1
							FROM web.USERS_TT TRT
							WHERE UserLogin = @login 
								AND TRT.TTID =  TP.ttID)
		--ORDER BY ProductID -- should be sorted!!!
	END
END

GO





/*check table web.Tasks*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Tasks')
BEGIN
	CREATE TABLE  web.Tasks (
		ID int IDENTITY PRIMARY KEY,
		Name varchar(200) ,
		ActionType tinyint ,
		[Action] int ,
		Question varchar(500) ,
		Alternatives varchar(max) ,
		[Description] varchar(500) ,
		IsFixed tinyint NOT NULL default 0,
		Multiple tinyint NOT NULL default 0 
	)

	INSERT INTO web.Tasks  VALUES
	('question1', 1, 1, 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã’Ã’', 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã’Ã’', 'ÃŽÃ¶Ã¥Ã­ÃªÃ  Ã²Ã®Ã°Ã£Ã®Ã¢Ã®Ã£Ã® Ã¯Ã°Ã¥Ã¤Ã±Ã²Ã Ã¢Ã¨Ã²Ã¥Ã«Ã¿', 0, 0), 
	('question2', 1, 2, 'Ã‚Ã»Ã¡Ã¥Ã°Ã¨Ã²Ã¥ Ã²Ã¨Ã¯ Ã’Ã’', 'Ã‚Ã»Ã¡Ã¥Ã°Ã¨Ã²Ã¥ Ã²Ã¨Ã¯ Ã’Ã’', 'Ã²Ã¨Ã¯ Ã’Ã’', 0, 0), 
	('question3', 1, 3, 'Ã’Ã’ Ã¨Ã¬Ã¥Ã¥Ã² Ã­Ã Ã°Ã³Ã¦Ã­Ã³Ã¾ Ã°Ã¥ÃªÃ«Ã Ã¬Ã³?', null , 'Ã­Ã Ã°Ã³Ã¦Ã­Ã Ã¿ Ã°Ã¥ÃªÃ«Ã Ã¬Ã ', 0, 0), 
	('question4', 1, 4, 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã’Ã’ Ã¯Ã® 100-Ã¡Ã Ã«Ã¼Ã­Ã®Ã© Ã¸ÃªÃ Ã«Ã¥', 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã’Ã’ Ã¯Ã® 100-Ã¡Ã Ã«Ã¼Ã­Ã®Ã© Ã¸ÃªÃ Ã«Ã¥', 'Ã®Ã¶Ã¥Ã­ÃªÃ  100', 0, 0), 
	('question5', 1, 5, 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã’Ã’ Ã¯Ã® 10-Ã¡Ã Ã«Ã¼Ã­Ã®Ã© Ã¸ÃªÃ Ã«Ã¥', 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã’Ã’ Ã¯Ã® 10-Ã¡Ã Ã«Ã¼Ã­Ã®Ã© Ã¸ÃªÃ Ã«Ã¥', 'Ã®Ã¶Ã¥Ã­ÃªÃ  10', 0, 0), 
	('question6', 1, 6, 'ÃŠÃ ÃªÃ®Ã¥ Ã¢Ã Ã¸Ã¥ Ã¬Ã­Ã¥Ã­Ã¨Ã¥ Ã® Ã«Ã®Ã¿Ã«Ã¼Ã­Ã®Ã±Ã²Ã¨ ÃªÃ«Ã¨Ã¥Ã­Ã²Ã ', null , 'Ã¬Ã­Ã¥Ã­Ã¨Ã¥ Ã’Ã’', 0, 0), 
	('question7', 1, 7, 'Ã‘Ã¤Ã¥Ã«Ã Ã©Ã²Ã¥ Ã´Ã®Ã²Ã® Ã´Ã Ã±Ã Ã¤Ã  Ã§Ã¤Ã Ã­Ã¨Ã¿', null , 'Ã´Ã®Ã²Ã® Ã´Ã Ã±Ã Ã¤Ã ', 0, 1), 
	('question9', 2, 1, 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã¢Ã»ÃªÃ«Ã Ã¤ÃªÃ¨ Ã¯Ã°Ã®Ã¤Ã³ÃªÃ²Ã ', 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã¢Ã»ÃªÃ«Ã Ã¤ÃªÃ¨ Ã¯Ã°Ã®Ã¤Ã³ÃªÃ²Ã ', null , 0, 0), 
	('question10', 2, 2, 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã¢Ã»ÃªÃ«Ã Ã¤ÃªÃ¨ Ã¯Ã°Ã®Ã¤Ã³ÃªÃ²Ã ', 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã¢Ã»ÃªÃ«Ã Ã¤ÃªÃ¨ Ã¯Ã°Ã®Ã¤Ã³ÃªÃ²Ã ', null , 0, 0), 
	('question11', 2, 3, 'Ã‡Ã Ã¬Ã¥Ã²Ã¨Ã«Ã¨ Ã‚Ã» Ã¯Ã°Ã®Ã±Ã²Ã°Ã®Ã·Ã¥Ã­Ã­Ã»Ã© Ã¯Ã°Ã®Ã¤Ã³ÃªÃ²?', null , null , 0, 0), 
	('question12', 2, 4, 'Ã‘ÃªÃ®Ã«Ã¼ÃªÃ® Ã²Ã®Ã¢Ã Ã°Ã  Ã­Ã  Ã¯Ã®Ã«ÃªÃ¥', 'Ã‘ÃªÃ®Ã«Ã¼ÃªÃ® Ã²Ã®Ã¢Ã Ã°Ã  Ã­Ã  Ã¯Ã®Ã«ÃªÃ¥', null , 0, 0), 
	('question13', 2, 5, 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã¢Ã»ÃªÃ«Ã Ã¤ÃªÃ¨', 'Ã„Ã Ã©Ã²Ã¥ Ã®Ã¶Ã¥Ã­ÃªÃ³ Ã¢Ã»ÃªÃ«Ã Ã¤ÃªÃ¨', null , 0, 0), 
	('question15', 2, 7, 'Ã‘Ã¤Ã¥Ã«Ã Ã©Ã²Ã¥ Ã´Ã®Ã²Ã® Ã²Ã®Ã¢Ã Ã°Ã ', null , null , 0, 0), 
	('question18', 2, 10, 'ÃˆÃ§Ã¬Ã¥Ã­Ã¨Ã²Ã¼ Ã¶Ã¥Ã­Ã³', null , 'Ã°Ã¥Ã¤Ã ÃªÃ²Ã¨Ã°Ã®Ã¢Ã Ã²Ã¼ Ã¶Ã¥Ã­Ã³', 1, 0), 
	('new_order', 2, 11, 'Ã‘Ã¤Ã¥Ã«Ã Ã²Ã¼ Ã§Ã ÃªÃ Ã§', null , 'Ã”Ã®Ã°Ã¬Ã  Ã±Ã®Ã§Ã¤Ã Ã­Ã¨Ã¿ Ã§Ã ÃªÃ Ã§Ã ', 1, 0)
END


GO

/*check table web.Actions*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Actions')
BEGIN
	CREATE TABLE  web.Actions (
		ID int IDENTITY PRIMARY KEY,
		Name varchar(200) 
	)

	INSERT INTO web.Actions VALUES
	('Checkbox'),('Radiobuttons'),('YES/NO'),('Rate'),('Bar'),
	('TextAnswer'),('Photo'),('Barscan'),('Integer'),('Float'),('Order')
END

/*check table web.ActionTypes*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'ActionTypes')
BEGIN
	CREATE TABLE  web.ActionTypes (
		ID int IDENTITY PRIMARY KEY,
		Name varchar(100) 
	)
	INSERT INTO web.ActionTypes VALUES ('ÃÃ® Ã’Ã’'),('ÃÃ® Ã¯Ã°Ã®Ã¤Ã³ÃªÃ²Ã Ã¬')
END




GO


/*check for proc web.get_Actions*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_Actions'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_Actions
END
GO
CREATE PROC web.get_Actions @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		SELECT T.ID as id, T.ActionType as type, T.[Action] as act,
			T.Question as quest,T.Alternatives as ans, T.IsFixed as fix, T.multiple as mult
		from web.Tasks  T
	END
END

GO




IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOOutlets'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'ID' )

BEGIN
	IF EXISTS  (SELECT 1
				FROM sys.columns
					WHERE  [object_id] = Object_ID('sprSOOutlets')
					AND   is_identity = 1)
		BEGIN
			DECLARE  @IDENTITI_SKU varchar (100) = (SELECT name
														from sys.columns
														where [object_id] = Object_ID('sprSOOutlets')
														AND  is_identity = 1 )
			exec('ALTER TABLE  sprSOOutlets ADD ID AS  '+@IDENTITI_SKU)
		END
	ELSE
		BEGIN
			ALTER TABLE  sprSOOutlets ADD ID INT IDENTITY
		END 
END



go

IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOOutlets'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'ln' )
BEGIN
	ALTER TABLE  sprSOOutlets ADD ln float 
END

IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOOutlets'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'lg' )
BEGIN
	ALTER TABLE  sprSOOutlets ADD lg float 
END


IF NOT EXISTS (SELECT 1
				FROM sys.columns CO
				WHERE EXISTS  (SELECT 1
									FROM sys.tables TA
									WHERE SCHEMA_NAME(TA.[schema_id]) = 'dbo' 
											AND TA.name = 'sprSOOutlets'
											AND CO.[object_id] = TA.[object_id])
				AND CO.name = 'ClientsID' )
BEGIN
	ALTER TABLE  sprSOOutlets ADD ClientsID int not null default 0 
END


go




/*check for proc web.get_Magazines*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_Magazines'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_Magazines
END
GO
CREATE PROC web.get_Magazines @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT  OU.ID as id, OU.CustOutletName as name,OutletAddress as addr, 
			OU.ln, OU.lg,ClientsID as clID
			FROM sprSOOutlets OU
			WHERE BuyerID =  @DISRT
			AND EXISTS (SELECT 1
							FROM web.USERS_TT RT
							WHERE RT.UserLogin = @login
									AND RT.TTID = OU.ID)
	END
END

GO


IF NOT EXISTS (SELECT 1
				from sys.indexes
				WHERE [object_id] = Object_ID('sprSOOutlets')
				AND  name = 'IX_WEB_sprSOOutlets_SEARCH') 

BEGIN
	CREATE NONCLUSTERED INDEX IX_WEB_sprSOOutlets_SEARCH ON sprSOOutlets (BuyerID,ID )
	INCLUDE (CustOutletName,OutletAddress,ln,lg,ClientsID)
END


GO 



/*check table web.Clients*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Clients')
BEGIN
	CREATE TABLE  web.Clients (
		ID int IDENTITY PRIMARY KEY,
		CL_REF varchar (300) NOT NULL,
		Name varchar (500) ,
		PayDays int not null default 0
	)
	
END


/*check table web.ClientsPayForms*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'ClientsPayForms')
BEGIN
	CREATE TABLE  web.ClientsPayForms (
		ID int IDENTITY PRIMARY KEY,
		ClientID int not null,
		PayFormID int not null
	)
	
	CREATE NONCLUSTERED INDEX IX_ClientsPayForms_SETT ON web.ClientsPayForms (ClientID)
		INCLUDE (PayFormID)
END



/*check table web.Discounts*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Discounts')
BEGIN
	CREATE TABLE  web.Discounts (
		ID int IDENTITY PRIMARY KEY,
		TTiD int not null,
		PayFormID int not null,
		Comment varchar (max) not null default '-',
		Discount float
	)
	
	CREATE NONCLUSTERED INDEX IX_Discounts_SEARCH ON web.Discounts (PayFormID,TTiD)
		INCLUDE (Comment, Discount)
END




/*check for proc web.get_MagazinesDiscounts*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_MagazinesDiscounts'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_MagazinesDiscounts
END
GO
CREATE PROC web.get_MagazinesDiscounts @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		SELECT TTID ttID, PayFormID pf , Comment com, Discount disc
			FROM  web.Discounts DI
			WHERE EXISTS (SELECt 1
							FROM web.USERS_TT TT
							WHERE TT.UserLogin = @login
							AND TT.TTID = DI.TTiD)
	END
END

GO



GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'PRODQuestionAnswers')
BEGIN
CREATE TABLE  web.PRODQuestionAnswers (
	ID bigint IDENTITY PRIMARY KEY,
	AnswerId bigint,
	ProductId int,
	RouteID bigint,
	ttID int,
	ActionID int,
	AnswerType int ,
	Answer varchar(max),
	Ln float,
	Lg float,
	IsPhoto int,
	DDate date,
)


END


GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'TTQuestionAnswers')
BEGIN
CREATE TABLE  web.TTQuestionAnswers (
	ID bigint IDENTITY PRIMARY KEY,
	AnswerId bigint,
	RouteID bigint,
	ActionID int,
	ttid int,
	AnswerType int,
	Answer varchar(max),
	Ln float,
	Lg float,
	IsPhoto int,
	DDate date 
)


END
GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'Warehouse')
BEGIN
CREATE TABLE  web.Warehouse (
	ID bigint IDENTITY PRIMARY KEY,
	ttID int,
	ProdId int,
	QTY float,
	Ddate date
)

CREATE NONCLUSTERED INDEX IX_Warehouse_SEARCH ON web.Warehouse (ttID)
	INCLUDE (ProdId,QTY)

END




GO 
/*check table web.RouteActions*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'RouteActions')
BEGIN
	CREATE TABLE  web.RouteActions (
		ID bigint IDENTITY PRIMARY KEY,
		RouteID bigint not null,
		ActionID bigint not null
	)
	
	CREATE NONCLUSTERED INDEX IX_RouteActions_SEARCH ON web.RouteActions (RouteID)
		INCLUDE (ActionID)
END


GO

/*check for proc web.get_Magazines*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_RouteActions'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_RouteActions
END
GO
CREATE PROC web.get_RouteActions @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT  OU.RouteID rID, OU.ActionID act, OU.ID id
			FROM web.RouteActions OU
			WHERE  EXISTS (SELECT 1
							FROM web.Routes RO
							WHERE RO.UsrLogin = @login
									AND RO.ID = OU.RouteID
									AND  RO.VisitDay >= CAST(CURRENT_TIMESTAMP as DATE) )
	END
END

GO



GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'TTProducts')
BEGIN
CREATE TABLE  web.TTProducts (
	ID bigint IDENTITY PRIMARY KEY,
	TTID int,
	ProdID int,
	SortOrder int NOT NULL DEFAULT 0,
	Coef float NOT NULL DEFAULT 1,
	Color varchar(100) NOT NULL DEFAULT '92,106,112',
	Groups varchar(200) NOT NULL DEFAULT '-'
)
CREATE NONCLUSTERED INDEX IX_TTProducts_SEARCH ON web.TTProducts (TTID ASC)
	INCLUDE ( 	ProdID,SortOrder,Coef,Color,Groups)

END


GO
IF NOT EXISTS  (SELECT 1 FROM  sys.tables 
						WHERE SCHEMA_NAME(schema_id) = 'web' 
							AND name = 'USERS_TT')
BEGIN
CREATE TABLE  web.USERS_TT (
	UserLogin  varchar(50) not null,
	TTID int not null
)

CREATE CLUSTERED INDEX IX_USER_TT ON  web.USERS_TT (UserLogin,TTID)
CREATE NONCLUSTERED INDEX IX_USER_TT_ByUser ON  web.USERS_TT (UserLogin) INCLUDE (TTID)
END

GO

/*check for proc web.get_MagazinesPayForms*/
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'get_MagazinesPayForms'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.get_MagazinesPayForms
END
GO
CREATE PROC web.get_MagazinesPayForms @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT  OU.ID, CLF.PayFormID pf
			FROM sprSOOutlets OU
			INNER JOIN web.ClientsPayForms CLF
				ON CLF.ClientID = OU.ClientsID
			WHERE  buyerID = @DISRT
			AND EXISTS (SELECT 1
							FROM web.USERS_TT UTT
							WHERE UTT.UserLogin = @login
									AND UTT.TTID = OU.ID)
	END
END

GO


IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'UPD_USER_ACTIVE'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.UPD_USER_ACTIVE
END
go

CREATE PROC web.UPD_USER_ACTIVE @ID int, @ACT int
AS
BEGIN
	UPDATE web.USERS 
		SET is_online = @ACT, last_date = CURRENT_TIMESTAMP
	WHERE ID = @ID
END
go


IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_VISIT'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_VISIT
END
go

CREATE PROC web.INS_VISIT @date datetime,@id int, @isReject int, @lg float, @ln float, @reject varchar (400)
AS
BEGIN
	INSERT INTO web.VisitControl (PhoneTime,RouteID,LN,LG,isReject,VisitComment,CurentTime)
	values (@date,@id,@ln,@lg,@isReject,@reject,CURRENT_TIMESTAMP)
END

go

IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'UPD_USER_GEO'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.UPD_USER_GEO
END
go

CREATE PROC web.UPD_USER_GEO @ID int, @LAT float ,@LNG float
AS
BEGIN
	UPDATE web.USERS 
		SET last_ln = @LAT,last_lg =@LNG, last_date = CURRENT_TIMESTAMP
	WHERE ID = @ID
END


GO



go

IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_WAREHOUSE'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_WAREHOUSE
END
go

CREATE PROC web.GET_WAREHOUSE  @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) = @pass)
	DECLARE @BuyreID int = (SELECT BuyerID from web.USERS WHERE UserLogin = @login)
	BEGIN
		
		SELECT ProdId as id, QTY as qty
		from web.Warehouse WH
			WHERE EXISTS (SELECT 1
							FROM sprSoSKU SK
								WHERE SK.ID = WH.ProdId
								AND SK.BuyerID = @BuyreID)

	END
END


GO




/*check table web.Orders*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Orders')
BEGIN
	CREATE TABLE web.Orders(
	ID bigint IDENTITY PRIMARY KEY,
	OrderID varchar(100) ,
	Manager varchar(100) ,
	TTID bigint ,
	RouteID bigint ,
	CreateDate datetime ,
	deliveryType int ,
	ln float ,
	lg float ,
	Comment varchar(500) ,
	PayFormID int ,
	ProdId int ,
	P_Discount float ,
	P_QTY float ,
	P_SUM float ,
	P_SUMD float ,
	T_QTY float ,
	T_SUM float ,
	T_SumD float ,
	ServerDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
)
	
	CREATE NONCLUSTERED INDEX IX_ORDER_SERCH_DUBL ON web.Orders (ProdId , RouteID ,OrderID )
END

GO

GO
/*check table web.Stocks*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Stocks')
BEGIN
	CREATE TABLE web.Stocks(
	ID bigint IDENTITY PRIMARY KEY,
	RouteID bigint ,
	ProductId int ,
	QTY float ,
)
	
	CREATE NONCLUSTERED INDEX IX_STOCKS_SEARCH ON web.Stocks (ProductId ,RouteID )
END

GO

GO
/*check table web.Transitions*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'Transitions')
BEGIN
	CREATE TABLE web.Transitions(
	ID bigint IDENTITY PRIMARY KEY,
	TRANSITION varchar(100) ,
	ORDERID varchar(100) ,
	JSON nvarchar(max) 
)
END

GO


GO
/*check table web.TTAnswer*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'TTAnswer')
BEGIN
	CREATE TABLE web.TTAnswer(
		ID bigint IDENTITY PRIMARY KEY,
		AnsID bigint ,
		Date datetime ,
		ln float ,
		lg float ,
		Answer varchar(400) ,
		isReject int 
	)

	CREATE NONCLUSTERED INDEX IX_TT_ANSWERS_SEARCH ON web.TTAnswer (AnsID ,[Date] )
END

GO


GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'DEL_ORDER'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.DEL_ORDER
END
go

CREATE PROC web.DEL_ORDER @OrderId varchar (100), @RouteID bigint
AS
BEGIN
		UPDATE ST
		SET ST.QTY = ST.QTY + O.P_QTY
		FROM web.Warehouse ST
			INNER JOIN  web.Orders O 
				ON ST.ProdId = O.ProdId
		WHERE O.OrderID = @OrderID 
			AND O.RouteID = @RouteID

		SELECT ProdId as id, QTY as qty
		into #WH_CH
		from web.Warehouse WH
		WHERE EXISTS (SELECT 1
							FROM web.Orders O
							WHERE O.ProdId = WH.ProdId
								AND O.RouteID =@RouteID
								AND O.OrderID = @OrderID )

		DELETE FROM web.Orders 
		WHERE RouteID =@RouteID 
		AND OrderID = @OrderID

		SELECT *
		FROM  #WH_CH
END

GO




GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_CHANGEDSTOCKS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_CHANGEDSTOCKS
END
go

CREATE PROC web.GET_CHANGEDSTOCKS @OrderID varchar (100), @RouteID int
AS 
	BEGIN
		SELECT ProdId as id, QTY as qty
		from web.Warehouse WH
		WHERE EXISTS (SELECT 1
							FROM web.Orders O
							WHERE O.ProdId = WH.ProdId
								AND O.RouteID =@RouteID
								AND O.OrderID = @OrderID )
	END

GO

GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_ProByTT'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_ProByTT
END
go

CREATE PROC web.GET_ProByTT @login varchar (30) , @pass varchar (30)
AS
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		DECLARE @DISRT  int = (SELECT BuyerID FROM web.USERS WHERE UserLogin = @login)
		SELECT  TP.TTID ttId, TP.ProdID, TP.SortOrder sort,
				TP.Color col, TP.Groups gr
			FROM web.TTProducts TP
			WHERE EXISTS (SELECT 1
								FROM web.USERS_TT UT
								WHERE UT.UserLogin = @login
									AND TP.TTID = UT.TTID
									)
	END
END


GO

GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'Get_TT'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.Get_TT
END
go

CREATE PROC web.Get_TT @login varchar (30) , @pass varchar (30)
AS 
BEGIN
	IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		SELECT  RO.ID as id, OU.Name as name,  OU.[Address] as addr,  OU.Picture as pic, 
		OU.LG as lg, OU.ln as ln, VisitDay as visit,RO.TTID as ttid ,
		OU.PayForms as payForms, OU.Discounts as disc,
		-- info about visit if exists
		0 as isVisit ,'-' reject
		from apk.Routes  RO
			LEFT JOIN apk.Outlets OU
				ON RO.TTID  = OU.ID
		WHERE UsrLogin  = @login 
	END
END


GO



GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_ORDER'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_ORDER
END
go

CREATE PROC web.INS_ORDER (@order ORDER_TYPE readonly)
AS
BEGIN
	--DELETE PREVIOUS IF EXIST (SOMETHING THAT SHOULD NEVER HEPPEN)
	DELETE FROM web.Orders 
		WHERE EXISTS (SELECT 1
							FROM @order O
								WHERE O.ProdId =  web.Orders.ProdId 
									AND O.RouteID =  web.Orders.RouteID
									AND O.OrderID =  web.Orders.OrderID)


	-- INSERT RECORDS
	INSERT INTO web.Orders (OrderID,Manager,TTID,RouteID,CreateDate ,deliveryType ,
	ln,lg,Comment,PayFormID,ProdId,P_Discount,P_QTY,P_SUM,P_SUMD,T_QTY,T_SUM,T_SumD)
	SELECT OrderID,Manager,TTID,RouteID,CreateDate ,deliveryType ,
		ln,lg,Comment,PayFormID,ProdId,P_Discount,P_QTY,P_SUM,P_SUMD,T_QTY,T_SUM,T_SumD
	from @order

	--UPDATE STOCKS
	DECLARE @OrderID varchar(100), @RouteID int
	SELECT TOP 1 @OrderID = OrderID ,@RouteID = RouteID from @order
	UPDATE ST
		SET ST.QTY = CASE 
					WHEN ST.QTY - O.P_QTY <0 THEN 0
					ELSE ST.QTY - O.P_QTY
				END
	FROM web.Warehouse ST
		INNER JOIN  web.Orders O 
			ON ST.ProdId = O.ProdId
	WHERE O.OrderID = @OrderID 
		AND O.RouteID = @RouteID
END


GO


GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_STOCKS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_STOCKS
END
go

CREATE PROC web.INS_STOCKS (@stocks STOCKS_TYPE readonly)
AS
BEGIN
	DELETE FROM web.Stocks
	WHERE EXISTS (SELECT 1 
						FROM @stocks st
						WHERE st.ProductId =web.Stocks.ProductId
						AND st.RouteID = web.Stocks.RouteID )
	INSERT INTO web.Stocks (RouteID, ProductId, QTY)
	SELECT  RouteID, ProductId, QTY 
		FROM @stocks
END


GO

GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_TRANSITIONS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_TRANSITIONS
END
go

CREATE PROC web.INS_TRANSITIONS  @TRANSITION varchar (100),@ORDERID varchar (100),@JSON nvarchar (max)
AS
BEGIN
	INSERT INTO web.Transitions(TRANSITION,ORDERID,JSON)
	VALUES (@TRANSITION,@ORDERID,@JSON)
END


GO


GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_TTANSWERS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_TTANSWERS
END
go

CREATE PROC web.INS_TTANSWERS (@answers TTANSWERS_TYPE readonly)
AS
BEGIN
	DELETE FROM  web.TTAnswer
	WHERE EXISTS (SELECT 1
					FROM @answers A
					WHERE A.AnsID = web.TTAnswer.AnsID
					AND A.[Date] =web.TTAnswer.[Date] )
	INSERT INTO web.TTAnswer (AnsID, [Date],ln,lg,Answer,isReject)
	SELECT  AnsID, [Date],ln,lg,Answer,isReject
	FROM @answers
END


GO

GO
/*check table web.TTAnswer*/
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'TTProdAnswer')
BEGIN
	CREATE TABLE web.TTProdAnswer(
		ID bigint IDENTITY PRIMARY KEY,
		ActKey bigint,
		ProdId bigint,
		ActId bigint ,
		Date datetime ,
		ln float ,
		lg float ,
		Answer varchar(700)
	)

	CREATE NONCLUSTERED INDEX IX_TT_PROD_ANSWERS_SEARCH ON web.TTProdAnswer (ActKey ,ProdId,ActId,[Date] )
END

GO







GO
IF NOT EXISTS  (SELECT 1 from sys.types WHERE name = 'TTPRODANSWERS_TYPE')
BEGIN
CREATE TYPE dbo.TTPRODANSWERS_TYPE AS TABLE(
		ActKey bigint,
		ProdId bigint,
		ActId bigint ,
		Date datetime ,
		ln float ,
		lg float ,
		Answer varchar(700)
)
END
GO

GO
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'INS_TT_PROD_ANSWERS'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.INS_TT_PROD_ANSWERS
END
go

CREATE PROC web.INS_TT_PROD_ANSWERS (@answers TTPRODANSWERS_TYPE readonly)
AS
BEGIN
	DELETE FROM  web.TTProdAnswer
	WHERE EXISTS (SELECT 1
					FROM @answers A
					WHERE A.ActKey = web.TTProdAnswer.ActKey
					AND A.ProdId = web.TTProdAnswer.ProdId
					AND A.ActId = web.TTProdAnswer.ActId
					AND A.[Date] =web.TTProdAnswer.[Date] )
	INSERT INTO web.TTProdAnswer (ActKey,ProdId,ActId, [Date],ln,lg,Answer)
	SELECT  ActKey,ProdId,ActId, [Date],ln,lg,Answer
	FROM @answers
END


GO

go
IF NOT EXISTS ( SELECT 1
					FROM sys.tables TA
					WHERE SCHEMA_NAME(TA.[schema_id]) = 'web' 
					AND TA.name = 'UserRelations')
	BEGIN
		CREATE TABLE web.UserRelations (
			ID int IDENTITY PRIMARY KEY,
			usr int,
			chief int
		)
		create nonclustered index IX_UserRelations_search on web.UserRelations
		(chief) include (usr)
	END
GO


go
IF EXISTS (SELECT 1 
					from sys.procedures 
					where name = 'GET_MyUsers'
					AND  SCHEMA_NAME([schema_id]) = 'web'  )
BEGIN
	DROP PROCEDURE web.GET_MyUsers
END


GO
CREATE PROC web.GET_MyUsers  @login varchar (100), @pass varchar (100) , @ID int
--Declare  @login varchar (30) = 'TM_admin' , @pass varchar (30) = '2222', @ID int =2
AS
BEGIN
IF EXISTS (SELECT 1 from web.USERS  WHERE UserLogin = @login AND  apk.getPass(UserPass) =@pass)
	BEGIN
		select ID id, UserLogin [login],apk.getPass(UserPass) pass,
		FirstName, LastName,Email mail, IsActive act, Photo photo
		from web.Users US
			WHERE EXISTS  (SELECT 1
							FROM web.UserRelations UR
							WHERE UR.chief =@ID
							AND US.ID = UR.usr )
	END
END

GO